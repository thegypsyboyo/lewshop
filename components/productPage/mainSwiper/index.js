import React, { useState } from 'react'
import styles from "./styles.module.scss"
import ReactImageMagnify from 'react-image-magnify';


export default function MainSwiper({ activeImg, images }) {
    const [active, setActive] = useState(0);

    return (
        <div className={styles.swiper}>
            <div className={styles.swiper__active}>
                <ReactImageMagnify {...{
                    smallImage: {
                        alt: 'Wristwatch by Ted Baker London',
                        isFluidWidth: true,
                        src: activeImg || images[active].url
                    },
                    largeImage: {
                        src: activeImg || images[active].url,
                        width: 1200,
                        height: 1800
                    },
                    enlargedImageContainerDimensions: {
                        width: "150%",
                        height: "150%",
                    },
                }}
                />
            </div>
            <div className={styles.swiper__list}>
                {images.map((img, index) => (
                    <div key={index} className={`${styles.swiper__list_item } ${ index == active && styles.active }`} onMouseEnter={() => setActive(index)} >
                        <img src={img.url} alt='img' />
                    </div>
                ))}
            </div>
        </div>
    )
}
