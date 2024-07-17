// src/app/nfc-reader/nfc-reader.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-nfc-reader',
  templateUrl: './nfc-reader.component.html',
  styleUrls: ['./nfc-reader.component.css']
})
export class NfcReaderComponent {
  message: string = 'Waiting for NFC tag...';

  constructor() { }

  async readNfcTag() {
    if ('NDEFReader' in window) {
      try {
        const ndef = new (window as any).NDEFReader();
        await ndef.scan();
        ndef.onreading = (event: any) => {
          const decoder = new TextDecoder();
          for (const record of event.message.records) {
            if (record.recordType === 'text') {
              this.message = decoder.decode(record.data);
            } else {
              this.message = 'NFC tag read, but it contains non-text data.';
            }
          }
        };
      } catch (error: any) {
        this.message = `Error: ${error.message}`;
      }
    } else {
      this.message = 'Web NFC is not supported on this device/browser.';
    }
  }
}
