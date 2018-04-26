const data = {
  "url": "https://api.github.com/repos/tensorflow/tensorflow/issues/18838",
  "repository_url": "https://api.github.com/repos/tensorflow/tensorflow",
  "labels_url": "https://api.github.com/repos/tensorflow/tensorflow/issues/18838/labels{/name}",
  "comments_url": "https://api.github.com/repos/tensorflow/tensorflow/issues/18838/comments",
  "events_url": "https://api.github.com/repos/tensorflow/tensorflow/issues/18838/events",
  "html_url": "https://github.com/tensorflow/tensorflow/pull/18838",
  "id": 317395896,
  "number": 18838,
  "title": "Add DeviceSet to Cluster",
  "user": {
    "login": "aaroey",
    "id": 31743510,
    "avatar_url": "https://avatars0.githubusercontent.com/u/31743510?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/aaroey",
    "html_url": "https://github.com/aaroey",
    "followers_url": "https://api.github.com/users/aaroey/followers",
    "following_url": "https://api.github.com/users/aaroey/following{/other_user}",
    "gists_url": "https://api.github.com/users/aaroey/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/aaroey/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/aaroey/subscriptions",
    "organizations_url": "https://api.github.com/users/aaroey/orgs",
    "repos_url": "https://api.github.com/users/aaroey/repos",
    "events_url": "https://api.github.com/users/aaroey/events{/privacy}",
    "received_events_url": "https://api.github.com/users/aaroey/received_events",
    "type": "User",
    "site_admin": false
  },
  "labels": [
    {
      "id": 386191887,
      "url": "https://api.github.com/repos/tensorflow/tensorflow/labels/stat:awaiting%20response",
      "name": "stat:awaiting response",
      "color": "5319e7",
      "default": false
    }
  ],
  "state": "open",
  "locked": false,
  "assignee": {
    "login": "aselle",
    "id": 326106,
    "avatar_url": "https://avatars1.githubusercontent.com/u/326106?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/aselle",
    "html_url": "https://github.com/aselle",
    "followers_url": "https://api.github.com/users/aselle/followers",
    "following_url": "https://api.github.com/users/aselle/following{/other_user}",
    "gists_url": "https://api.github.com/users/aselle/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/aselle/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/aselle/subscriptions",
    "organizations_url": "https://api.github.com/users/aselle/orgs",
    "repos_url": "https://api.github.com/users/aselle/repos",
    "events_url": "https://api.github.com/users/aselle/events{/privacy}",
    "received_events_url": "https://api.github.com/users/aselle/received_events",
    "type": "User",
    "site_admin": false
  },
  "assignees": [
    {
      "login": "aselle",
      "id": 326106,
      "avatar_url": "https://avatars1.githubusercontent.com/u/326106?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/aselle",
      "html_url": "https://github.com/aselle",
      "followers_url": "https://api.github.com/users/aselle/followers",
      "following_url": "https://api.github.com/users/aselle/following{/other_user}",
      "gists_url": "https://api.github.com/users/aselle/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/aselle/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/aselle/subscriptions",
      "organizations_url": "https://api.github.com/users/aselle/orgs",
      "repos_url": "https://api.github.com/users/aselle/repos",
      "events_url": "https://api.github.com/users/aselle/events{/privacy}",
      "received_events_url": "https://api.github.com/users/aselle/received_events",
      "type": "User",
      "site_admin": false
    }
  ],
  "milestone": null,
  "comments": 2,
  "created_at": "2018-04-21T00:40:58Z",
  "updated_at": "2018-04-21T19:10:12Z",
  "closed_at": null,
  "author_association": "NONE",
  "body": "It took a bit of effort to get the build_all_android.sh script to work.  The effort was primarily due to the same issues encountered here: https://github.com/tensorflow/tensorflow/issues/14186\r\nArmed with the work around outlined there, I modified compile_nsync.sh to have \r\nAR := ${NDK_ROOT}/toolchains/'\"$toolchain\"'/prebuilt/'\"$android_os_arch\"'/bin/'\"$bin_prefix\"'-ar\r\nThis does result in being able to build the arm variants (armeabi, armeabi-v7a and arm64-v8a) as well as the x86_64 variant.  However, x86 variant fails with:\r\n/Users/swinston/Downloads/android-ndk-r12b/platforms/android-21/arch-x86/usr/lib/crtend_android.o\r\n/tmp/77a95b0085967f7191ad958665724b6f/sysroot/usr/include/unistd.h:173: error: undefined reference to '__page_size'\r\n/tmp/77a95b0085967f7191ad958665724b6f/sysroot/usr/include/unistd.h:173: error: undefined reference to '__page_size'\r\n/tmp/77a95b0085967f7191ad958665724b6f/sysroot/usr/include/unistd.h:173: error: undefined reference to '__page_size'\r\n/tmp/77a95b0085967f7191ad958665724b6f/sysroot/usr/include/unistd.h:173: error: undefined reference to '__page_size'\r\ncollect2: error: ld returned 1 exit status\r\n\r\nThis is a OSX build host and using ndk r12b.\r\n\r\nNB: count me amongst those eager for r16/r17 ndk support!\r\n\r\n"
}

export default data;
