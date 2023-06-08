import PropTypes from 'prop-types';
import { forwardRef, useState } from 'react';
import image from '~/assets';

function Image({ src, errorImage, ...props }, ref) {
    const [fallback, setFallback] = useState('');
    const handleError = () => {
        setFallback(errorImage || image.noimage);
    };

    return <img src={fallback || src} {...props} ref={ref} onError={handleError} />;
}

Image.propTypes = {
    src: PropTypes.string,
    errorImage: PropTypes.string,
};

export default forwardRef(Image);
