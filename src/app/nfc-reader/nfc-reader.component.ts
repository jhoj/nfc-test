// src/app/nfc-reader/nfc-reader.component.ts
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'nfc-reader',
  templateUrl: './nfc-reader.component.html',
  styleUrls: ['./nfc-reader.component.css']
})
export class NfcReaderComponent implements OnInit {
  @Input() isDebugMode: boolean = false;
  @Output() serialNumber = new EventEmitter<string>();
  status: string = "NFC reader not active";
  constructor() { }
  
  ngOnInit(): void {
    this.readNfcTag();
  }

  async readNfcTag() {    
    if ('NDEFReader' in window) {
      try {
        const ndef = new (window as any).NDEFReader();
        await ndef.scan();
        this.status = "NFC reader ready";
        ndef.onreading = (event: any) => {
          this.log(event);
          let serialNumber = event.serialNumber as string;
          serialNumber = serialNumber.replace(/:/g, '');

          this.serialNumber.emit(serialNumber);
        };      
      } catch (error: any) {
        this.log(`Error: ${error.message}`);
      }
    } else {
      this.log('Web NFC is not supported on this device/browser.');      
    }
  }

  log(message: any): void {
    if (this.isDebugMode) {
      console.log(message);
    }
  }
}
