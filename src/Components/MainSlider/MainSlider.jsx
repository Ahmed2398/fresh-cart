import React from 'react'
import img1 from "../../Assets/images/1.jpg"
import img2 from "../../Assets/images/2.jpg"
import sliderImg1 from "../../Assets/images/grocery-banner-2.jpeg"
import sliderImg2 from "../../Assets/images/grocery-banner.png"
import sliderImg3 from "../../Assets/images/slider-2.jpeg"
import Slider from 'react-slick'
import PlaceHolderImage from "../PlaceHolderImage/PlaceHolderImage";

function MainSlider() {

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay:true,
        autoplaySpeed:1000
    };

    let vertical  = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 1000,
        vertical: true,
        verticalSwiping: true,
    }


    return (
        <>
            <div className="row">
                <div className="col-md-9 p-0 mb-3">
                    <Slider {...settings}>

                            <img height={400} className='w-100' src={sliderImg1} alt="" />
                        <img height={400} className='w-100' src={sliderImg2} alt="" />
                        <img height={400} className='w-100' src={sliderImg3} alt="" />

                    </Slider>
                </div>
                <div className="col-md-3 p-0">
                    <Slider {...vertical}>
                    <PlaceHolderImage type="img" height={200} className='w-100' src={img1} alt="" />
                    <PlaceHolderImage type="img" height={200} className='w-100' src={img2} alt="" />
                        <PlaceHolderImage type="img" height={200} className='w-100' src={img1} alt="" />
                        <PlaceHolderImage type="img" height={200} className='w-100' src={img2} alt="" />
                        <PlaceHolderImage type="img" height={200} className='w-100' src={img1} alt="" />
                        <PlaceHolderImage type="img" height={200} className='w-100' src={img2} alt="" />
                    </Slider>
                </div>
            </div>
        </>
    )
}

export default MainSlider