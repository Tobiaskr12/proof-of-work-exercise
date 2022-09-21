import shajs from 'sha.js';

const inputStrings = [
  "0f215ffe5264488a9aba13672d5966d1eceda9e3062113dce1f005148dabbacd",
  "89f5fe5f827c6abe3d82cfd735fd486ed26a4d44db50c08fd2d26f77e7542249",
  "d0896c1824ff557b85282d89bb565b54b160a992aaedadf9165ac2ddf6b0c7de",
  "8e1306d792fd124dfbf0a380d373e8ca56358fa54d6121f6dd49876dbef88454",
  "0c58fead5e7c151a4207ab01b10612a925b2bdb7f28740fecdb39c70ec7c29ad",
  "ec3678bae4c2b9d2873f013982e97b31f712308e4f313629c9011bc08949dc23",
  "5e4c105cedf4cd46e32a544b806ae8172aec4f1a989581e2f20267beada6110b",
  "56cd5a5b4a05b398dbb408992d995b8897aa8602787d42bcb4447b45eb34ad55",
  "bf4f288b18aee3118ca3db5934f041a5ec7a9f58362a9f44958b4704b309e810",
  "c495357234b2e78f13be9698045052669028a6a1800cb0edd31318bd365837a3",
  "a89a09620d6f86006fd5c9aa9c1a50422b3f06a8c04f085f822a012f3d338c63",
  "1c768b97682dc0eea5b2b36a8d5c25bb4332a799857b32cdaf68be1af2eec484",
  "7fe1d035e6ba37997096cdb778d24ee5710e63afa384337a602f5efabd8ed0cd",
  "6da6a8626d2f60868ffc9d4ed1a21092dac26ce3ca5e846ca0ad2cd60765bd89",
  "854ebd231fdf2ab02932bbb4486a4c31fdc09cb89be83cbc248432d78eae0865",
]

let calculationTime = 0;

function findHashWithLeadingZeros(input: string, requiredZeros: number) {
    let hash = '';
    let i = 0;
    const startTime = +Date.now();

    while (hash.substring(0, requiredZeros) !== '0'.repeat(requiredZeros)) {
        hash = shajs('sha256').update(input + i).digest('hex');
        i++;
        const elapsedTime = +Date.now() - startTime;

        if (elapsedTime > 1000 * 60) {
          console.log('Allowed time exceeded');
          hash = 'Not found within time limit';
          break;
        }
    }

    return {
      hash,
      elapsedTime: +Date.now() - startTime,
    };
}

for (const input of inputStrings) {
  const requiredLeadingZeros = 6;

  console.log("Finding solution for input: " + input + ". The solution must have ", requiredLeadingZeros, "leading zeros.");
  const result = findHashWithLeadingZeros(input, requiredLeadingZeros);
  console.log("Solution for input: ", input, "was found in:", result.elapsedTime, "ms");
  console.log("Solution: ", result.hash);
  console.log("--------------------------------------------------");

  calculationTime += result.elapsedTime;
}

console.log("Total calculation time: ", calculationTime, "ms");
console.log("Average calculation time: ", calculationTime / inputStrings.length, "ms");

// Average calculation time:
// 1 leading zero: 1.4ms
// 2 leading zeros: 7.266ms
// 3 leading zeros: 34.666ms
// 4 leading zeros: 219.133ms
// 5 leading zeros: 4048.666ms
// 6 leading zeros: Can't be calculated in less than 30 seconds
// Conclusion: The time to find a hash with n leading zeros is exponential
