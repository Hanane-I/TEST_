import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }


  getRomain(num){
    var lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},
      roman, 
      i,
      DateOk = false,
      jour, mois, annee,j,
      NewDate='';
    
    //Répartir la date
    let data = num.split('-');
    jour = data[0];
    mois = data[1];
    annee = data[2];

    //tester si la date est valide
    if(annee >=1){
      if(mois >= 1 && mois <= 12){
        //tester sur le mois 2
        if(mois == 2){
          if(annee%4==0 && annee%100!=0 || annee%400==0){ //annee bissextile alors jour = 29 sinon jour = 28
            if( jour >= 1 && jour <= 29)
              DateOk = true;
          }
          else if( jour >= 1 && jour <= 28)
            DateOk = true;
        }
        else{
          if(jour >= 1 && jour <= 31){
            DateOk = true;
          }
        } 
      }
    }

    //convertir au chiffre romain
    if(DateOk){
      for(j=0;j<data.length;j++){
        roman = '';
        for ( i in lookup ) {
          while ( data[j] >= lookup[i] ) {
            roman += i;
            data[j] -= lookup[i];
          }
        }
        if(j != (data.length - 1 )){
          NewDate +=roman;
          NewDate += '-'
        }
        else{
          NewDate +=roman;
        } 
      }
    }
    else{
      NewDate = "Erreur. Veuillez saisir une date correcte"
    }

    //retuen la résultat
    return NewDate;
  }
}
