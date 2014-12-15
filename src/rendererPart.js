'use strict';

var RendererPart = function(slideFactory) {

  var renderedSlides = [];

  return {

    render: function() {
      for (var i = renderedSlides.length - 1; i >= 0; i--) {
        if(this.getSlidePosition(renderedSlides[i].item) === null) {
          renderedSlides[i].destroy();
          renderedSlides.splice(i, 1);
        }
      };

      this.slides.left && updateSlide.call(this, -1, this.slides.left.item);
      this.slides.center && updateSlide.call(this, 0, this.slides.center.item);
      this.slides.right && updateSlide.call(this, 1, this.slides.right.item);

      function updateSlide(position, item) {
        var slide;

        for (var i = renderedSlides.length - 1; i >= 0; i--) {
          if(renderedSlides[i].item === item) {
            slide = renderedSlides[i];
          }
        };
        
        if(!slide) {
          slide = slideFactory(item);
          slide.element.css({position: 'absolute', width: '100%', height: '100%'});
          renderedSlides.push(slide);
        }

        slide.element.css(this.TRANSFORM_PROP, 'translate(' + position * 100 + '%' + ', 0)');

        var positions = ['previous', 'current', 'next'];
        for(var index = 0; index < 3; index++) {
          if(index - 1 == position) {
            slide.element.addClass(positions[index]);
          } else {
            slide.element.removeClass(positions[index]);
          }
        }
      }
    },

    translateSlides: function(offset, duration) {
      this.translateContainer(-offset * 100 + '%', duration + 'ms');
    },

    getSlidePosition: function(item) {
      return this.slides.left && this.slides.left.item === item ? -1
           : this.slides.center && this.slides.center.item === item ? 0
           : this.slides.right && this.slides.right.item === item ? 1
           : null;
    },

    getSlidesPosition: function() {
      return -this.getContainerPosition() / this.getContainerWidth();
    }

  }

};
