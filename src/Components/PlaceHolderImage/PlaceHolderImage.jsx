import React, {useState} from 'react';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
const PlaceHolderImage = (props) => {

    return (
        <>
            <>
                {props.type === 'img' &&
                    <LazyLoadImage
                        src={props.src}
                        alt={props.alt}
                        loading="lazy"
                        width={props.width}
                        height={props.height}
                        className={props.className}
                        effect="blur"
                    />
                }
                {props.type === 'video' &&
                    <video src={props.src} alt={props.alt} loading="lazy" width="750" height="500" controls/>}
            </>
        </>
    );
};

export default PlaceHolderImage;