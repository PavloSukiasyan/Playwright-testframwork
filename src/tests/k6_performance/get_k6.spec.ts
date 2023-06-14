import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    // warm up
    { duration: '10s', target: 1 },
    // ramp up
    { duration: '30s', target: 20 },
    // the test
    { duration: '300s', target: 200 },
    // ramp down
    { duration: '30s', target: 20 },

    { duration: '10s', target: 3 },
  ],
};

export default function basicK6Test() {
  //  https://httpbin.test.k6.io/
  const res = http.get('https://www.bathrooms.com/blogs');
  check(res, { 'status was 200': (r) => r.status === 200 });
  sleep(1);
}
