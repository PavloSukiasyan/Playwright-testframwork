import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    // warm up
    { duration: '10s', target: 5 },
    // ramp up
    { duration: '30s', target: 30 },
    // the test
    { duration: '100s', target: 400 },
    // ramp down
    { duration: '30s', target: 60 },

    { duration: '10s', target: 5 },
  ],
};

export default function basicK6Test() {
  //  https://httpbin.test.k6.io/
  const res = http.get('https://www.bathrooms.com/blogs');
  check(res, { 'status was 200': (r) => r.status === 200 });
  sleep(1);
}
