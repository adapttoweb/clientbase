import { Injectable } from '@angular/core';
import { Http, Request, RequestMethod, ResponseOptions, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/do';  // for debugging

/**
 * This class provides the MailGun service with methods to read names and add names.
 */
@Injectable()
export class MailGunService {

  data: any;
  authHeader = new Headers();
  mail: any;

  mailgunUrl: string;
  mailgunApiKey: string;

  /**
   * Creates a new MailGunService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  constructor(private http: Http) {
    this.mailgunUrl = 'mg.adapttoweb.com';
    //wrong key
    //this.mailgunApiKey = "key-72141edbe5677cca242d7b15658a352e";

    //locked working
    this.mailgunApiKey = 'key-72141edbe5677cca242d7b15658a352e';
  }


  /**
   * Sends a mailgun email
   */
  sendEmail(recipient: string = 'j.pivovarnikova@rublys.com'
            , subject: string = 'testing'
            , campaign: any = []
            , goodies: any = []
            , account: any = []) {
      var requestHeaders = new Headers();
      //requestHeaders.append('Access-Control-Allow-Headers', 'Authorization');
      // requestHeaders.append('Access-Control-Allow-Origin', '*');
      //requestHeaders.append("Authorization", "Basic "+btoa("api:" + this.mailgunApiKey));
      //requestHeaders.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");

      this.http.request(new Request({
          method: RequestMethod.Post,
          url: 'http://business.rublys.com/mail-pump.php',
          //url: "https://api.mailgun.net/v3/" + this.mailgunUrl + "/messages",
          body: 'from=office@rublys.com&to='
                + recipient + '&subject='
                + subject + '&campaign='
                + campaign + '&goodies='
                + goodies + '&account='
                + account,
          headers: requestHeaders
      }))
      .subscribe(success => {
        var responseHeaders = new Headers();

        //success.headers = responseHeaders;

          console.log('SUCCESS -> ' + JSON.stringify(success));
      }, error => {
          console.log('ERROR -> ' + JSON.stringify(error));
      });
  }


  private _errorHandler(error: Response) {
    console.error(error);
    return Observable.throw(error || 'Server Error');
  }

  /**
   * Returns an Observable for the HTTP GET request for the JSON resource.
   * @return {string[]} The Observable for the HTTP request.
   */
  get(): Observable<string[]> {
    return this.http.get('assets/data.json')
                    .map((res: Response) => res.json())
    //              .do(data => console.log('server data:', data))  // debug
                    .catch(this.handleError);
  }

  /**
    * Handle HTTP error
    */
  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
