import axios from 'axios'
export const apiClient = axios.create(
    {
        baseURL: 'http://localhost:8080'
        // baseURL: 'http://rest-api-full-stack-h2-env.eba-dmxcj99p.ap-southeast-2.elasticbeanstalk.com/'
    }
)