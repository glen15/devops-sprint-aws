// npm install <package-name> --save-dev
const axios = require('axios')
const expect = require('chai').expect
require('dotenv').config();


describe('http - EC2와 S3 설정을 확인합니다.', () => {
  it('EC2 연결이 되었다면, 서버의 응답으로 "Hello World"를 받아야 합니다.', async () => {
    let res = await axios.get(`${process.env.REACT_APP_API_URL}`)
    expect(res.data).to.be.eql('Hello World')
  })

  it('S3에 정적 파일들을 업로드 했다면, "Deployment Practice"가 출력되어야 합니다.', async () => {
    let result = await axios.get(`${process.env.S3_ADDRESS}`)
    let title = result.data.includes('Deployment Practice')
    expect(title).to.be.eql(true)
  })

  it('EC2와 S3 사이의 환경설정을 올바르게 설정해야 합니다.', async () => {
    let result = await axios.get(`https://yeoraebucket.s3.ap-northeast-2.amazonaws.com/static/js/2.2e1a1952.chunk.js`)
    let ec2url = result.data.includes(`${process.env.REACT_APP_API_URL}`)
    expect(ec2url).to.be.eql(true)
  })
})