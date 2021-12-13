const axios = require('axios')
const expect = require('chai').expect
require('dotenv').config();


describe('http - EC2와 S3 설정을 확인합니다.', () => {
  it('1. EC2 연결이 되었다면, 서버의 응답으로 "Hello World"를 받아야 합니다.', async () => {
    let res = await axios.get(`${process.env.REACT_APP_API_URL}`)
    expect(res.data).to.be.eql('Hello World')
  })

  it('2. S3에 정적 파일들을 업로드 했다면, "Deployment Practice"가 출력되어야 합니다.', async () => {
    let result = await axios.get(`${process.env.S3_ADDRESS}`)
    let title = result.data.includes('Deployment Practice')
    expect(title).to.be.eql(true)
  })

  it('3. EC2와 S3 사이의 환경설정을 올바르게 설정해야 합니다.', async () => {
    let result = await axios.get(`https://yeoraebucket.s3.ap-northeast-2.amazonaws.com/static/js/2.2e1a1952.chunk.js`)
    let ec2url = result.data.includes(`${process.env.REACT_APP_API_URL}`)
    expect(ec2url).to.be.eql(true)
  })
})

describe('http - RDS, EC2 연결', () => {
  it('4. RDS를 배포하고, EC2와 연결했으면, "/status" 요청에 대한 응답이 { isLogin: true, isConnectedToDatabase: true } 이어야 한다', async () => {
    
    let res = await axios
      .post(
        `${process.env.REACT_APP_API_URL}/signin`,
        {
          username: '김코딩',
          password: '1234'
        },
        { withCredentials: true }
      )

    let checkStatus = await axios.get( `${process.env.REACT_APP_API_URL}/status`,
        {
          withCredentials: true,
          headers: {
            'Authorization': `Bearer ${res.data}`
          }
        })
        
      expect(checkStatus.data).to.be.eql({ isLogin: true, isConnectedToDatabase: true })
  })
})