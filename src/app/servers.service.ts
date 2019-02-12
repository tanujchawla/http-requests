import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs/Rx";

@Injectable()
export class ServersService {
    
    constructor(private http : Http) {}

    storeServers(posts : any[]) {
        const headers = new Headers({
            'Content-Type': 'application/json'
        });
        return this.http.post('https://jsonplaceholder.typicode.com/posts', 
            posts, 
            { headers : headers }
        );
    }

    getServers() {
        return this.http.get('https://jsonplaceholder.typicode.com/posts')
            .map(
                (response: Response) => {
                    const data = response.json();
                    for(const server of data) {
                        server.id = 'Post-'+server.id;
                    }
                    return data;
                }
            )
            .catch(
                (error : Response) => {
                    return Observable.throw('Something went wrong!');
                }
            );
    }

    updateServer(post : any) {
        const headers = new Headers({
            'Content-Type': 'application/json'
        });
        return this.http.put('https://jsonplaceholder.typicode.com/posts/1', 
            post, 
            { headers : headers }
        );
    }

    getDocName() {
        return this.http.get('http://localhost:3050/api/v1/doc/get/5c57d33d4af8c92cb41afc44')
            .map(
                (response: Response) => {
                    const api_response = response.json();
                    return api_response.data.filename;
                }
            );
    }
}