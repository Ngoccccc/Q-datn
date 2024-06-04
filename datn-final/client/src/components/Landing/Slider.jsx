import { Card, CardHeader, CardBody, Typography } from "@material-tailwind/react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation, Autoplay } from "swiper/modules";
import './styles.css';


const Slider = () => {
    return (
        <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
            autoplay={{
                delay: 2000,
                disableOnInteraction: false,
            }}
        >


            <SwiperSlide >Slide 3</SwiperSlide>
            <SwiperSlide >
                <iframe style={{ borderRadius: "10px" }} width="100%" height="70%" src="https://www.youtube.com/embed/UH5HZOtTNb4?si=M611h6qbjz6N9JzC" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                <Typography variant="h5" color="blue-gray" className="mt-4">
                    UI/UX Review Chec
                </Typography>
            </SwiperSlide>
            <SwiperSlide >
                <iframe style={{ borderRadius: "10px" }} width="100%" height="70%" src="https://www.youtube.com/embed/UH5HZOtTNb4?si=M611h6qbjz6N9JzC" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                <Typography variant="h5" color="blue-gray" className="mt-4">
                    UI/UX Review Chec
                </Typography>
            </SwiperSlide>
            <SwiperSlide >
                <iframe style={{ borderRadius: "10px" }} width="100%" height="70%" src="https://www.youtube.com/embed/UH5HZOtTNb4?si=M611h6qbjz6N9JzC" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                <Typography variant="h5" color="blue-gray" className="mt-4">
                    UI/UX Review Chec
                </Typography>
            </SwiperSlide>
            <SwiperSlide >
                <iframe style={{ borderRadius: "10px" }} width="100%" height="70%" src="https://www.youtube.com/embed/rfscVS0vtbw" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                <Typography variant="h5" color="blue-gray" className="mt-4">
                    UI/UX Review Chec
                </Typography>
            </SwiperSlide>
            <SwiperSlide >
                <iframe style={{ borderRadius: "10px" }} width="100%" height="70%" src="https://www.youtube.com/embed/_uQrJ0TkZlc" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                <Typography variant="h5" color="blue-gray" className="mt-4">
                    UI/UX Review Chec
                </Typography>
            </SwiperSlide>
        </Swiper>
    );
};

export default Slider;