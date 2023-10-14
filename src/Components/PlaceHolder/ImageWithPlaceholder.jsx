import React, {useState} from 'react';

const ImageWithPlaceholder = ({placeholderImageUrl, imageCover }) => {
    const [imageSrc, setImageSrc] = useState(imageCover);
    const handleImageError = () => {
        // If the image fails to load, replace it with the placeholder image.
        setImageSrc(placeholderImageUrl);
    };
    return (
        <img
            src={imageSrc}
            alt="Image"
            onError={handleImageError}
        />
    );
};

export default ImageWithPlaceholder;