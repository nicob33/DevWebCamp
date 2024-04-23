import Swiper from 'swiper';
import { Navigation} from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/navigation';

document.addEventListener('DOMContentLoaded', function(){
    if(document.querySelector('.slider')){
        const opciones = {
            slidesPerView: 1, //La cantidad que quiero que se muestre
            spaceBetween: 15, // El espacio en pixeles entre uno y otro
            freeMode: true, // Por si no funciona el slide (normalmente funciona sin esto, pero por las dudas)
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            breakpoints: { //Esto se utiliza como mediaquery, para distintos tamaños de pantalla
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                },
                1200: {
                    slidesPerView: 4,
                }
            }
        }
        Swiper.use([Navigation])
        new Swiper('.slider', opciones)
    }
});