import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    // warm up
    { duration: '5s', target: 1 },
    // ramp up
    { duration: '15s', target: 5 },
    // the test
    { duration: '45s', target: 10 },
    // ramp down
    { duration: '5s', target: 0 },
  ],
};

export default function () {
  const res = http.get('https://httpbin.test.k6.io/');
  check(res, { 'status was 200': (r) => r.status === 200 });
  sleep(1);
}
