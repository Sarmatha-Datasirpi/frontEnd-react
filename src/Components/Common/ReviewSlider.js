import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
import { Card, CardBody } from "reactstrap";


// import "swiper/css";
// import "swiper/css/pagination";

// import required modules
// import { Autoplay, Mousewheel } from "swiper";

const ReviewSlider = () => {
  return (

    <div>
      <Card className="border border-dashed shadow-none">
        <CardBody>
          <div className="d-flex">
            <div className="flex-shrink-0 avatar-sm">
              <div className="avatar-title bg-light rounded">

              </div>
            </div>
            <div className="flex-grow-1 ms-3">
              <div>
                <p className="text-muted mb-1 fst-italic text-truncate-two-lines">
                  " Great product and looks great, lots of features. "
                </p>
                <div className="fs-11 align-middle text-warning">
                  <i className="ri-star-fill"></i>
                  <i className="ri-star-fill"></i>
                  <i className="ri-star-fill"></i>
                  <i className="ri-star-fill"></i>
                  <i className="ri-star-fill"></i>
                </div>
              </div>
              <div className="text-end mb-0 text-muted">
                - by <cite title="Source Title">Force Medicines</cite>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card className="border border-dashed shadow-none">
        <CardBody>
          <div className="d-flex">
            <div className="flex-shrink-0">

            </div>
            <div className="flex-grow-1 ms-3">
              <div>
                <p className="text-muted mb-1 fst-italic text-truncate-two-lines">
                  " Amazing template, very easy to understand and manipulate.
                  "
                </p>
                <div className="fs-11 align-middle text-warning">
                  <i className="ri-star-fill"></i>
                  <i className="ri-star-fill"></i>
                  <i className="ri-star-fill"></i>
                  <i className="ri-star-fill"></i>
                  <i className="ri-star-half-fill"></i>
                </div>
              </div>
              <div className="text-end mb-0 text-muted">
                - by <cite title="Source Title">Henry Baird</cite>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card className="border border-dashed shadow-none">
        <CardBody>
          <div className="d-flex">
            <div className="flex-shrink-0 avatar-sm">
              <div className="avatar-title bg-light rounded">

              </div>
            </div>
            <div className="flex-grow-1 ms-3">
              <div>
                <p className="text-muted mb-1 fst-italic text-truncate-two-lines">
                  "Very beautiful product and Very helpful customer service."
                </p>
                <div className="fs-11 align-middle text-warning">
                  <i className="ri-star-fill"></i>
                  <i className="ri-star-fill"></i>
                  <i className="ri-star-fill"></i>
                  <i className="ri-star-line"></i>
                  <i className="ri-star-line"></i>
                </div>
              </div>
              <div className="text-end mb-0 text-muted">
                - by <cite title="Source Title">Zoetic Fashion</cite>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card className="border border-dashed shadow-none">
        <CardBody>
          <div className="d-flex">
            <div className="flex-shrink-0">

            </div>
            <div className="flex-grow-1 ms-3">
              <div>
                <p className="text-muted mb-1 fst-italic text-truncate-two-lines">
                  " The product is very beautiful. I like it. "
                </p>
                <div className="fs-11 align-middle text-warning">
                  <i className="ri-star-fill"></i>
                  <i className="ri-star-fill"></i>
                  <i className="ri-star-fill"></i>
                  <i className="ri-star-half-fill"></i>
                  <i className="ri-star-line"></i>
                </div>
              </div>
              <div className="text-end mb-0 text-muted">
                - by <cite title="Source Title">Nancy Martino</cite>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>

  );
};

export default ReviewSlider;
