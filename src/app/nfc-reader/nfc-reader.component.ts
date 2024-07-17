// src/app/nfc-reader/nfc-reader.component.ts
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nfc-reader',
  templateUrl: './nfc-reader.component.html',
  styleUrls: ['./nfc-reader.component.css']
})
export class NfcReaderComponent implements OnInit {
  message: string = 'Waiting for NFC tag...';
  serial: string = "";
  constructor(private cdr: ChangeDetectorRef) { }
  
  ngOnInit(): void {
    this.readNfcTag();
  }

  async readNfcTag() {
    if ('NDEFReader' in window) {
      try {
        const ndef = new (window as any).NDEFReader();
        await ndef.scan();
        ndef.onreading = (event: any) => {
          console.log(event);
          this.serial = event.serialNumber;
          this.cdr.detectChanges();
          const decoder = new TextDecoder();
          for (const record of event.message.records) {
            console.log(record);
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
