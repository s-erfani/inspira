import {Component, Input} from '@angular/core';
import {MatMenuItem} from "@angular/material/menu";
import {SVG_PATHS} from '../svg-paths';
import {QuoteModel} from '../../models/quote';

@Component({
  selector: 'app-share-menu',
    imports: [
        MatMenuItem
    ],
  templateUrl: './share-menu.component.html',
})
export class ShareMenuComponent {
  protected readonly svgPaths = SVG_PATHS;
  @Input() quote!: QuoteModel;

  shareQuote(quoteItem: QuoteModel, socialMedia: string): void {
    const text = `Inspira\n${quoteItem.quote}\n${quoteItem.author}`;
    if (socialMedia == "telegram") {
      const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(text)}`;
      window.open(telegramUrl, '_blank');
    } else if (socialMedia == "whatsapp") {
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, '_blank');
    }
  }

}
