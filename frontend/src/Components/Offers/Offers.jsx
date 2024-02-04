import React, { useEffect, useState } from "react";

const Offers = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "400516202451391",
        autoLogAppEvents: true,
        xfbml: true,
        version: "v12.0",
      });

      // Perform API request
      window.FB.api(
        "/145322628670161/feed?fields=message,attachments",
        "GET",
        {
          access_token:
            "EAAFsRHH5Ub8BOyRzU4tZCoGCRfVgwgG8Y515Wm7Pnq8emhD1S9zidZCcSWAx7YiaZAFBQr16ZAbMLf7KPxuPd5UZACjZCMUMVs0klYmrsufaQyLZCVw7qgHy7qbkyuuI27PQZARgWw7uABvJKoV7FniJ0G6BvJZCJKy5oLifABGVtjeTZAJApEt3jdtSw9c7BWo7RWvqOkOcd85vrX4v4ZD",
        },
        function (response) {
          if (response && !response.error) {
            console.log(response.data); // Handle the response data here
            setPosts(response.data);
          } else {
            console.error(response.error);
          }
        }
      );
    };

    // Load the SDK asynchronously
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []); // The empty dependency array ensures that this effect runs once when the component mounts

  return (
    posts && (
      <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Your Facebook Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-800">{post.message || post.story}</p>
            
            {/* Check if the post has attachments (images or videos) */}
            {post.attachments && post.attachments.data.length > 0 && (
              <div className="mt-4">
                {post.attachments.data.map((attachment, index) => (
                  <div key={index} className="mb-2">
                    {/* Check if the attachment type is photo */}
                    {(attachment.type === 'photo' || attachment.type === 'album' || attachment.type === "profile_media") && (
                      <img src={attachment.media.image.src} alt={"..."} className="w-full h-40 object-cover rounded-md" />
                    )}

                    {/* Check if the attachment type is video */}
                    {attachment.type === "video_inline" && (
                      <video controls className="w-full h-40 rounded-md">
                        <source src={attachment.media.source} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </div>
                ))}
              </div>
            )}

            <p className="mt-4 text-blue-500">
              {/* Link to the post on Facebook */}
              <a href={post.attachments.data[0].target.url} target="_blank" rel="noopener noreferrer">
                View on Facebook
              </a>
            </p>
          </div>
        ))}
      </div>
    </div>
    )
  );
};

export default Offers;
