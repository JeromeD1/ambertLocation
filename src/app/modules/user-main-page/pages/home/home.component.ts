
import { Component, OnInit, Renderer2, ElementRef, HostListener } from '@angular/core';
import { BookingDataService } from '../../../../shared/booking-data.service';
import { Traveller } from '../../../../models/Traveller.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

constructor(private renderer: Renderer2, private el: ElementRef, private bookingDataService: BookingDataService) {}

traveller!: Traveller;

ngOnInit(): void {
    this.scrollEffect();
    this.updateImageHeight();
    this.bookingDataService.getTraveller().subscribe(traveller => this.traveller = traveller);
}

//on écoute l'évênement de changement de taille de la fenêtre pour toujours mettre à jour la hauteur de l'image
@HostListener('window:resize', ['$event'])
onResize(event: Event) {
  this.updateImageHeight();
  this.onWindowScroll(event)
}

@HostListener('window:scroll', ['$event'])
onWindowScroll(event: Event) {
  const landingPage = this.el.nativeElement.querySelector('#landingPage');
  const landingPageImage = this.el.nativeElement.querySelector('#landingPage img');
  const imageHeight = landingPageImage.offsetHeight;
  let scrollPosition = window.scrollY;
this.renderer.setStyle(landingPage,'height', imageHeight - scrollPosition + "px");


}

scrollEffect(): void {
  this.renderer.listen('window', 'scroll', (event) => {
    const landingPage = this.el.nativeElement.querySelector('#landingPage');
    const nuage = this.el.nativeElement.querySelector('#nuage');
    let scrollPosition = window.scrollY;
    const maxScrollLandingImage = 100;
    const maxScrollNuage = 50;


    if(scrollPosition <= maxScrollLandingImage){
      this.renderer.setStyle(landingPage, 'top', -scrollPosition + 'px');
    } else {
      this.renderer.setStyle(landingPage, 'top', -maxScrollLandingImage + 'px');
    }

    if(scrollPosition <= maxScrollNuage){
      this.renderer.setStyle(nuage, 'bottom', scrollPosition + 'px');
    } else {
      this.renderer.setStyle(nuage, 'bottom', maxScrollNuage + 'px');
    }
  })
}

updateImageHeight() :void {
  const landingPageImage = this.el.nativeElement.querySelector('#landingPage img');
  const imageHeight = landingPageImage.offsetHeight;
  const openImageSection = this.el.nativeElement.querySelector('.openImage');
  this.renderer.setStyle(openImageSection,'height', imageHeight + 'px')
}


}

