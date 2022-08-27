import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private auth:AuthService, private router: Router) { }

  userdetail= {
    fullname: '',
    address:'',
    mobile:'',
   
    userType:'',
    partnertype:'',

    pannumber:'',
    heighestqualification:'',
    addtionalqualification:'',
    workexperience:'',

    gstnumber:'',
    
    skills:['html','css','bootstarp','angular','node','express','mongo'],
    }
    
    newlyaddedskill :string = '';
    usertypes= ['Admin', 'Finance Admin','Partner']
    defaulUserType = this.usertypes[0];
    trainertypes= ['Individual', 'Company']
    defaultTrainerType = this.trainertypes[0];

    
  showPartnerInfo(newObj:any) {
    // When Individual is selected, show PanNumber/GSt#
    const trainertypeInfo = document.getElementById('partnerinfo');
    const individualTrainerInfo = document.getElementById('individualInfo');
    const  companyTrainerInfo = document.getElementById('companyInfo');
    if(trainertypeInfo != null){
      trainertypeInfo.style.display = 'block';
    }
    if(newObj === 'Individual'){
      if(individualTrainerInfo != null)
        individualTrainerInfo.style.display = 'block';
        if(companyTrainerInfo != null)
          companyTrainerInfo.style.display = 'none';
    }else if(newObj === 'Company'){
      if(individualTrainerInfo != null)
      individualTrainerInfo.style.display = 'none';
      if(companyTrainerInfo != null)
        companyTrainerInfo.style.display = 'block';
    }
    else{
      if(individualTrainerInfo != null)
        individualTrainerInfo.style.display = 'none';
      if(companyTrainerInfo != null)
        companyTrainerInfo.style.display = 'none';
    }
}

updateProfile(){
  this.auth.updateUserProfile(this.userdetail)
    .subscribe({
      next: (succ: any)=> {
        alert('Profile Updated');
        if(succ.userType == 'Partner') {
          this.router.navigate(['partner/dashboard']);
        } else if(succ.userType == 'Admin') {
          this.router.navigate(['admin/dashboard']);
        } else {
          this.router.navigate(['finance/dashboard']);
        }
      }
    });
}
showAddSkill(){
  const addSkillDiv = document.getElementById('addedittech');
  if(addSkillDiv != null){
    addSkillDiv.style.display = 'block';
  }
}
deleteSkill(o:any) {
  const index = this.userdetail.skills.indexOf(o);
  this.userdetail.skills.splice(index, 1);
 }
 editSkill(o:any) {
  console.log(o);
 }
 saveSkill(){
   //don't add if the skill already in tab, otherwise 
   //add the details as  a row to table skilltable and hide div
   if(this.newlyaddedskill !=''){
    if(this.userdetail.skills.indexOf(this.newlyaddedskill)<0){
      this.userdetail.skills.push(this.newlyaddedskill);
    }
    const addSkillDiv = document.getElementById('addedittech');
    if(addSkillDiv != null){
      addSkillDiv.style.display = 'none';
    }
   }
 }


  ngOnInit(): void {
    //find user details by _id
    var userid = localStorage.getItem("userid"); 
    this.auth.getUserProfile(userid).subscribe((data)=>{
      this.userdetail = JSON.parse(JSON.stringify(data));
      console.log('profile',this.userdetail);
      if(this.userdetail.partnertype === 'Company')
      this.showPartnerInfo(this.userdetail.partnertype);
    })
  }
}
