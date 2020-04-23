import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { CrisisServiceService } from 'src/app/service/crisis-service.service';
import { AlertController } from '@ionic/angular'; 


@Component({
  selector: 'app-otpaccess',
  templateUrl: './otpaccess.component.html',
  styleUrls: ['./otpaccess.component.scss'],
})
export class OtpaccessComponent implements OnInit {
  
  phone: string = "";
  cCode: string = "";
  otp: string = "";
  displayOtpSection = false;
  otpAI: string;
  
  constructor(private route: Router, private crisisService: CrisisServiceService,public alertCtrl: AlertController) {}

  ngOnInit() {
    localStorage.clear();
  }

  numberOnlyValidation(event: any) {
    const pattern = /[0-9.,]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  processForm(){
    
    if( this.cCode != "" && this.phone != ""){
      if(this.phone.length == 10){
        localStorage.setItem("phone",this.cCode+"-"+this.phone);
        this.crisisService.generateOtp(this.phone).subscribe(res => {
          this.otpAI =  res["otp"];
          console.log(this.otpAI);
        });
        if(this.otpAI != ""){
          this.displayOtpSection = true;
        }
      }
    }
    
  }

  validateOTP(){
    //alert("OTP Valid");
    if(this.otp!="" && this.otpAI == this.otp){
      this.route.navigate(["home/activity"]);
    }else{
      this.showAlert();
    }
  }

  async showAlert() { 
    const alert = await this.alertCtrl.create({ 
    header: 'Alert', 
    // subHeader: 'Battery Alert', 
    message: 'Wrong OTP. Please enter correct one.', 
    buttons: ['OK'] 
    }); 
    await alert.present(); 
    const result = await alert.onDidDismiss();  
    console.log(result); 
    } 
  
}
