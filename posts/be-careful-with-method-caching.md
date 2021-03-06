---
title: Be Careful With Method Caching
publish_date: 2017-03-01
description: Today I spent a good amount of time trying to understand why a specific spec was failing.
---

Today I spent a good amount of time trying to understand why a specific spec was
failing. It was a little bit like this (I changed classes/method names for the
sake of the example):

```ruby
require 'spec_helper'

RSpec.describe Blog do
  describe '#delete_oldest_post' do
    it "deletes the blog's oldest post" do
      blog = FactoryGirl.create(:blog)
      oldest_post = FactoryGirl.create(:post, created_at: Time.zone.now - 1.year)
      blog.posts << oldest_post

      expect { blog.delete_oldest_post }
        .to change { blog.oldest_post }
        .from(oldest_post)
        .to(nil)
    end
  end
end
```

Pretty straightforward, right? I don't care about stubs or mocks here, what I
want to do with this spec is to make sure the blog's oldest post got deleted.

Turns out I was getting a rspec expectation failure, saying that it expected to
change `blog.oldest_post` from `oldest_post` to `nil` but it did not. Basically
it didn't delete the association (so I thought).

The implementation for that method was quite simple too:

```ruby
class Blog < ActiveRecord::Base
  def delete_oldest_post
    oldest_post.delete if oldest_post.present?
  end
end
```

Easy enough: if the post has an oldest post delete it, if not, whatever (which
in ruby translates to `nil`). While I was debugging it I even tried to call
`#reload` on the blog object in the spec (to fetch it from the database again),
in hopes it was some weird rails sql cache or something, but no luck.

After a while I went to check the `#oldest_post` implementation, and then I saw
this:

```ruby
class Blog < ActiveRecord::Base
  has_many :posts

  def oldest_post
    @oldest_post ||= posts.oldest
  end
end
```

Don't bother how `PostAssociation#oldest` is implemented, it just returns the
oldest post for that blog and that's it.

But, the real problem here is that `@oldest_post ||=`.

That's a fairly common practice in ruby, while an object exists we can cache a
method by assigning it to a instance variable (using `@`). When we first call
that method, the `@oldest_post` variable is not defined, which then triggers the
`posts.oldest`.

The second time we call it, it won't try to fetch the oldest post again
(avoiding hitting the database once more, which is a good thing) and will return
whatever the `@oldest_post` variable points to. Common terrain for experienced
ruby developers, to be honest.

But check this out:

```ruby
blog = Blog.last # fetches the latest blog from the database
blog.oldest_post
# => <Post object>

blog.delete_oldest_post
# => successfully deletes the oldest post with sql logs and etc

blog.reload.posts.count
# => 0

blog.oldest_post
# => <Post object>
```

Wait, what just happened?

Yup, even after deleting the oldest post, the `blog` object still has a
reference to it in the `oldest_post` method, and this happened because of the
caching. We fetched the oldest post and kept it in the `@oldest_post`, even
after deleting it from the database.

So as long as the blog object exists in the context, that post will be there,
which is not the desirable behavior we want in this case.

Interesting enough, it fails for the `#persisted?` message, meaning that the
oldest post was really deleted.

```ruby
blog.oldest_post.persisted?
# => false
```

It seems silly, but these kind of things can be such a drag when you don't pay
attention to the details, specially in ruby where it is so easy mess up with
simple techniques.

Oh, regarding that test, I fixed it by removing the caching. It was totally
unnecessary for that case. I could have sent the `#persisted?` message and check
for a `false` value instead, but I don't think that's a good thing, after
deleting the oldest post I expect it to be nil and not to be a reference to a no
longer persisted object.

That's it, I hope you enjoyed.
