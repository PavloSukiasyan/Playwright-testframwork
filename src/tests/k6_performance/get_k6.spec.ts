import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    // warm up
    { duration: '5s', target: 1 },
    // ramp up
    { duration: '15s', target: 5 },
    // the test
    { duration: '200s', target: 50 },
    // ramp down
    { duration: '5s', target: 10 },

    { duration: '2s', target: 1 },
  ],
};

export default function basicK6Test() {
  //  https://httpbin.test.k6.io/
  const res = http.get('https://www.bathrooms.com/blogs');
  check(res, { 'status was 200': (r) => r.status === 200 });
  sleep(1);
}
