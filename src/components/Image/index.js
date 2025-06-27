import { useState, forwardRef, use } from 'react';
import classNames from 'classnames';
import images from '~/assets/images';
import styles from './Image.module.scss';

// customFallback la no dat ten lai cua prop fallback truyen vao
const Image = forwardRef(({src, alt, className, fallback: customFallback = images.noImage, ...props }, ref) => {
    const [fallback, setFallback] = useState('');

    const handleError = () => {
        setFallback(customFallback);
    };

    return (
        <img
            className={classNames(styles.wrapper, className)}
            src={fallback || src}
            alt={alt}
            ref={ref}
            {...props}
            onError={handleError}
        />
    );
});

export default Image;