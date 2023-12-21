import React from "react";
import { Link } from "react-router-dom";

const ShareButton = ({ platform, url, iconPath }) => {
    const handleShare = () => {
        let shareUrl;

        switch (platform) {
            case "facebook":
                // Construct the Facebook share dialog URL
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    url
                )}`;
                break;
            case "twitter":
                // Construct the Twitter share URL
                shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    url
                )}`;
                break;
            case "linkedIn":
                // Construct the LinkedIn share URL
                shareUrl = `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
                    url
                )}`;
                break;
            case "vk":
                // Construct the (VK) share URL
                shareUrl = `https://vk.com/share.php?url=${encodeURIComponent(url)}`;
                break;
            case "reddit":
                // Construct the Reddit share URL
                shareUrl = `https://www.reddit.com/submit?url=${encodeURIComponent(
                    url
                )}`;
                break;
            default:
                // Display a message if the platform is not recognized
                alert(`Sharing on ${platform} is not available`);
                return;
        }

        // Open a new tab with the share dialog
        window.open(shareUrl, "_blank");
    };

    return (
        <>
            <Link onClick={handleShare} className="share-link-social-icons">
                <img
                    src={iconPath}
                    alt="Rules illustration"
                    style={{ width: "40px", height: "40px" }}
                />
            </Link>
        </>
    );
};

export default ShareButton;
