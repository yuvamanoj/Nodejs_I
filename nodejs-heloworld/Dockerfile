# SOURCE: https://github.ibm.com/managed-security/msscertimg-nodejs-12/blob/master/Dockerfile
FROM mss-docker.artifactory.swg-devops.com/msscertimg-nodejs-12:latest
# https://nodejs.org/de/docs/guides/nodejs-docker-webapp/#creating-a-dockerfile
COPY . .
RUN npm ci
EXPOSE 3000/tcp
# NOTE: don't add CMD, it's in base IMG and uses `npm run start`
