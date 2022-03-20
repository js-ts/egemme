import React from "react";
import ImageGallery from "react-image-gallery";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import ImageHotspots from 'react-image-hotspots'
import Iframe from 'react-iframe'
import "./styles.css";
const PREFIX_URL =
  "https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/";

export default class Gallery extends React.Component {
  
  constructor() {
    super();
    this.state = {
      showIndex: false,
      showBullets: true,
      infinite: true,
      showThumbnails: true,
      showFullscreenButton: true,
      showGalleryFullscreenButton: true,
      showPlayButton: true,
      showGalleryPlayButton: true,
      showNav: true,
      isRTL: false,
      slideDuration: 450,
      slideInterval: 2000,
      slideOnThumbnailOver: false,
      thumbnailPosition: 'bottom',
      showVideo: {},
      useWindowKeyDown: true,
    };

    this.images = [
      {
        livep:'http://localhost:4000/gist/eb8bfb8b86a7e0b2078bcbe25c7be24f',
        renderItem:this._renderLivep.bind(this)
      },
      {
        original:`${PREFIX_URL}image_set_default.jpg`,
        thumbnail:`${PREFIX_URL}image_set_default.jpg`,
        hotspots:[ { x: 10, y: 30, content: <span>Hotspot 1</span> },
        { x: 40, y: 70, content: <span>Hotspot 2</span> },
        { x: 80, y: 30, content: <span>Hotspot 2</span> }],

        renderItem:this._renderHotspots.bind(this)
      },
      {
        original: `${PREFIX_URL}4v.jpg`,
        embedUrl: 'https://www.youtube.com/embed/4pSzhZ76GdM?autoplay=1&showinfo=0',
        thumbnail:'https://img.youtube.com/vi/4pSzhZ76GdM/1.jpg',
        description: 'Render custom slides within the gallery',
        renderItem: this._renderVideo.bind(this)
      },

      {
        original: `${PREFIX_URL}image_set_default.jpg`,
        thumbnail: `${PREFIX_URL}image_set_thumb.jpg`,
        imageSet: [
          {
            srcSet: `${PREFIX_URL}image_set_cropped.jpg`,
            media : '(max-width: 1280px)',
            renderItem: this._renderZoom.bind(this),

          },
          {
            srcSet: `${PREFIX_URL}image_set_default.jpg`,
            media : '(min-width: 1280px)',
            renderItem: this._renderZoom.bind(this),

          }
        ]
      },
      {
        original: `${PREFIX_URL}1.jpg`,
        thumbnail: `${PREFIX_URL}1t.jpg`,
        renderItem: this._renderZoom.bind(this),
        originalClass: 'featured-slide',
        thumbnailClass: 'featured-thumb',
        description: 'Custom class for slides & thumbnails'
      },

    ].concat(this._getStaticImages());
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.slideInterval !== prevState.slideInterval ||
        this.state.slideDuration !== prevState.slideDuration) {
      // refresh setInterval
      this._imageGallery.pause();
      this._imageGallery.play();
    }
  }

  _onImageClick(event) {
    console.debug('clicked on image', event.target, 'at index', this._imageGallery.getCurrentIndex());
  }

  _onImageLoad(event) {
    console.debug('loaded image', event.target.src);
  }

  _onSlide(index) {
    this._resetVideo();
    console.debug('slid to index', index);
  }

  _onPause(index) {
    console.debug('paused on index', index);
  }

  _onScreenChange(fullScreenElement) {
    console.debug('isFullScreen?', !!fullScreenElement);
  }

  _onPlay(index) {
    console.debug('playing from index', index);
  }

  _handleInputChange(state, event) {
    this.setState({[state]: event.target.value});
  }

  _handleCheckboxChange(state, event) {
    this.setState({[state]: event.target.checked});
  }

  _handleThumbnailPositionChange(event) {
    this.setState({thumbnailPosition: event.target.value});
  }

  _getStaticImages() {
    let images = [];
    for (let i = 2; i < 12; i++) {
      images.push({
        original: `${PREFIX_URL}${i}.jpg`,
        thumbnail:`${PREFIX_URL}${i}t.jpg`
      });
    }

    return images;
  }

  _resetVideo() {
    this.setState({showVideo: {}});

    if (this.state.showPlayButton) {
      this.setState({showGalleryPlayButton: true});
    }

    if (this.state.showFullscreenButton) {
      this.setState({showGalleryFullscreenButton: true});
    }
  }

  _toggleShowVideo(url) {
    this.state.showVideo[url] = !Boolean(this.state.showVideo[url]);
    this.setState({
      showVideo: this.state.showVideo
    });

    if (this.state.showVideo[url]) {
      if (this.state.showPlayButton) {
        this.setState({showGalleryPlayButton: false});
      }

      if (this.state.showFullscreenButton) {
        this.setState({showGalleryFullscreenButton: false});
      }
    }
  }

  _renderVideo(item) {
    return (
      <div>
        {
          this.state.showVideo[item.embedUrl] ?
            <div className='video-wrapper'>
                <a
                  className='close-video'
                  onClick={this._toggleShowVideo.bind(this, item.embedUrl)}
                >
                </a>
                <iframe
                  width='560'
                  height='315'
                  src={item.embedUrl}
                  frameBorder='0'
                  allowFullScreen
                >
                </iframe>
            </div>
          :
            <a onClick={this._toggleShowVideo.bind(this, item.embedUrl)}>
              <div className='play-button'></div>
              <img className='image-gallery-image' src={item.original} />
              {
                item.description &&
                  <span
                    className='image-gallery-description'
                    style={{right: '0', left: 'initial'}}
                  >
                    {item.description}
                  </span>
              }
            </a>
        }
      </div>
    );
  }

  _renderZoom(item) {
    return (
   
        <div id="Pinch">
              <TransformWrapper
                      defaultScale={1}
                    >
                      <TransformComponent>
                          {/* <div id="Pinch"> 
                          <ImageHotspots
                          src={product.image[0]['images']}
                          alt='Sample image'
                          
                          hideFullscreenControl={true}
                          hideZoomControls={true}
                          hideMinimap={true}
                          />
                        */}

                          <img
                            src={item.original}
                            alt='Sample image'
                           
                          />

                      </TransformComponent>
                    </TransformWrapper>
                        </div>
           
 
    );
  }

  _renderHotspots(item) {
    return (
   
        <div id="Pinch">
         
          
                      <ImageHotspots
                            src={item.original}
                            alt='Sample image'
                            hotspots={item.hotspots}
                    hideFullscreenControl={true}
                    hideZoomControls={true}
                    hideMinimap={true}
                          />

                        </div>
           
 
    );
  }

  _renderLivep(item) {
    return (
      <div>
          <div id="outerdiv">
                      <Iframe url={item.livep}
                        id="innerIframe"
                        display="initial"
                        position="absolute"
                        scrolling="no" />
                    </div> 
                {/* <iframe
                  width='560'
                  height='465'
                  src={item.livep}
                  frameBorder='0'
                  allowFullScreen
                >
                </iframe> */}
            
       
      </div>
    );
  }

  render() {
    return (

      <section className='app'>
        <ImageGallery
          ref={i => this._imageGallery = i}
          items={this.images}
          lazyLoad={false}
          onClick={this._onImageClick.bind(this)}
          onImageLoad={this._onImageLoad}
          onSlide={this._onSlide.bind(this)}
          onPause={this._onPause.bind(this)}
          onScreenChange={this._onScreenChange.bind(this)}
          onPlay={this._onPlay.bind(this)}
          infinite={this.state.infinite}
          showBullets={this.state.showBullets}
          showFullscreenButton={false}
          showPlayButton={false}
          showThumbnails={this.state.showThumbnails}
          showIndex={false}
          showNav={true}
          isRTL={false}
          thumbnailPosition={'left'}
         slideOnThumbnailOver={true}
          additionalClass="app-image-gallery"
          useWindowKeyDown={true}
        />

      </section>
    );
  }
}
