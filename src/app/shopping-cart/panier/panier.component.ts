import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { EcommService } from '../ecomm.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {

  constructor(private ecommService: EcommService) { }

  @Input() productAdded: any;

  total = 0;

  addTotal(prix: number, qte: number) {
    this.total += prix * qte;
  }
  @ViewChild('htmlData') htmlData!: ElementRef;

  openPDF() {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 100;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 20;
      PDF.addImage(FILEURI, 'PNG', 50, position, fileWidth, fileHeight);
      PDF.save('cart.pdf');
    });
  }

  @Output() onOrderFinished = new EventEmitter();

  paymentHandler: any = null;

  stripeAPIKey: any = 'pk_test_51ODmqfBEhjMIvhmrCNjl8w3oXpt3wDTyRKDs8DnkGonliguKi7oB6skoFaRcCQYT6ymZ7aGepBftGvbKp3y21EF800ZotBRudL';

  ngOnInit() {
    this.invokeStripe();
  }

  checkoutProduct() {
    this.makePayment();
  }

  makePayment() {
    let amount = this.total
    const paymentHandler = (<any>window).StripeCheckout.configure({

      key: this.stripeAPIKey,

      locale: 'auto',

      token: (stripeToken: any) => {
        this.processPayment(amount, stripeToken);
      },


    });

    paymentHandler.open({

      name: 'ItSolutionStuff.com',

      description: '3 widgets',

      amount: amount * 100,

    });

  }


  invokeStripe() {

    if (!window.document.getElementById('stripe-script')) {

      const script = window.document.createElement('script');

      script.id = 'stripe-script';

      script.type = 'text/javascript';

      script.src = 'https://checkout.stripe.com/checkout.js';

      script.onload = () => {

        this.paymentHandler = (<any>window).StripeCheckout.configure({

          key: this.stripeAPIKey,

          locale: 'auto',

          token: function (stripeToken: any) {

            console.log(stripeToken);

            alert('Payment has been successfull!');

            //signaler au composant ecommerce que la commande est réalisée
            this.onOrderFinished(false);
          },

        });

      };



      window.document.body.appendChild(script);

    }

  }

  processPayment(amount: any, stripeToken: any) {

    console.log(stripeToken);

    const data = {
      amount: amount * 100,
      token: stripeToken
    }

    this.ecommService.sendPayment(data)
      .subscribe({
        next: (res: any) => {
          console.log(res)
          alert("Operation sucessfully done")
          
          //imprimer
          this.openPDF()

          //signaler au composant ecommerce que la commande est finie
          this.onOrderFinished.emit(false);

          //Rénitialiser total à 0
          this.total = 0;
        },
        error: (e) => {
          console.log(e);
          alert("Error : Operation not done")
        },
      });
  }

}
