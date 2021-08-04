# SOURCE: https://github.ibm.com/managed-security/msscertimg-nodejs-12/blob/master/Dockerfile
FROM mss-docker.artifactory.swg-devops.com/msscertimg-nodejs-12:latest

# https://nodejs.org/de/docs/guides/nodejs-docker-webapp/#creating-a-dockerfile
#COPY package.json ./
#RUN yum update -y
#RUN npm cache clear --force 
#RUN npm install --legacy-peer-deps
COPY . .
RUN ls -lrth
#RUN npm install --update-binary --no-shrinkwrap
RUN npm ci
#RUN npm run build

#RUN npm cache clear --force 
#COPY . .
#COPY --chown=nodejs:nodejs . .
#RUN pwd && ls -lrth
#RUN npm ci
#RUN npm cache clean --force
#RUN npm cache verify
#RUN npm uninstall
#RUN npm i -S @carbon/ibm-security
#RUN npm install --update-binary --no-shrinkwrap
#RUN npm install
#RUN chown -R nodejs /opt/app/build/
#RUN npm run build
#COPY build /opt/app/
EXPOSE 3000/tcp
#ENV REACT_APP_BASE_URL=https://bff-devops.cloudtribe-devops-024f02d285327b3efec3badccd07e2a1-0000.us-south.containers.appdomain.cloud
#ENV IBM_ID_CLIENT_ID=YTNlMmYxYTItNDAzZS00
#ENV IBM_ID_CLIENT_SECRET=YjBkOTE4NzYtNDkzYi00
#ENV ISSUER=https://prepiam.ice.ibmcloud.com/oidc/endpoint/default
#ENV PASSPORT_SESSION_SECRET=PJKWE6U1MLFP9U821Q0G
#ENV DISCOVERY_URL=https://prepiam.ice.ibmcloud.com/v1.0/endpoint/default/.well-known/openid-configuration
#ENV BASE_URL=https://registration-devops.cloudtribe-devops-024f02d285327b3efec3badccd07e2a1-0000.us-south.containers.appdomain.cloud

ENTRYPOINT npm run start
# NOTE: don't add CMD, it's in base IMG and uses `npm run start`

#Manoj










