import { Component, OnInit, Input } from '@angular/core';
import { HomeObserverService } from 'src/app/core/services/home-observer.service';
import { Empresa } from '../../models/empresa.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @Input() visible: boolean;
  public empresa: Empresa;

  constructor(private observerService: HomeObserverService) { }

  ngOnInit(): void {
    this.observerService.empresaDestino.subscribe(res => {
      this.empresa = res;
    });
  }

}
