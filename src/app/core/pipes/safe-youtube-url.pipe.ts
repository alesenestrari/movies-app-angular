import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'safeYoutubeUrl'
})
export class SafeYoutubeUrlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(url: string): SafeHtml {
    const videoId = this.extractVideoId(url);

    const embedUrl = `https://www.youtube.com/embed/${videoId}`;

    return this.sanitizer.bypassSecurityTrustHtml(`<iframe width="560" height="315" src="${embedUrl}" frameborder="0" allowfullscreen></iframe>`);
  }

  private extractVideoId(url: string): string {
    const urlParams = new URLSearchParams(new URL(url).search);
    return urlParams.get('v') || '';
  }
}
