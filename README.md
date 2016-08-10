[pa]: https://console.ng.bluemix.net/catalog/services/predictive-analytics/  "PA"
[bm]: https://console.ng.bluemix.net/

# About
The application demonstrates usage of [IBM Predictive Analytics][pa] [Bluemix][bm] offering. This is also an extension of Big Data University [Predicting Customer Satisfaction course](https://courses.bigdatauniversity.com/courses/course-v1%3ABigDataUniversity%2BPA0103EN%2B2016/); while participation in this course helps, it is not obligatory.

Application is based on Node.js and Express framework. It uses [Predictive Analytics service API](https://console.ng.bluemix.net/docs/services/PredictiveModeling/index-gentopic1.html#pm_service_api) to integrate with IBM SPSS Modeler analytics.

Within this sample scoring application you are able to:
* select one of streams uploaded to *Predictive Analytics* service on Bluemix
* specify which source node should be used as scoring input
* verify required input data schema (fields name and type)
* drag and drop *csv* file with input data for scoring (or double click on input data field to open file browser)
* call *Predictive Analytics* service scoring API using „Perform Calculations” button
* display scoring result in form of table

![Application screenshot](/doc/app-scr.png)


# Requirements
* [IBM ID](https://www.ibm.com/account/profile/us?page=reg) to login to [Bluemix][bm]; see [free trial](http://www.ibm.com/developerworks/cloud/library/cl-bluemix-fundamentals-start-your-free-trial/index.html) article if you don't yet have it
* [Cloud Foundry command line interface](https://github.com/cloudfoundry/cli/releases) (only if you want to manually deploy to Bluemix)
* [IBM SPSS Modeler](http://ibm.com/tryspss) (only if you want to modify the stream or create a new one)
* [Node.js](https://nodejs.org) runtime (only if you want to modify the source code)

### Prepare Bluemix ecosystem
Whole preparation is described in details in *IBM Predictive Analytics Service for Bluemix - General* document, below steps are rather concise. In case of doubts refer to the document mentioned.

1. From Bluemix catalog choose [Predictive Analytics][pa] service. This service will later be binded with a Node.js application created from this sample. From this point note that the service itself offers a set of samples (this particular one among them) which can be automatically deployed and binded, which is the simplest way to see the sample in action.
2. Upload the SPSS Modeler stream to your instance of *Predictive Analytics* service. This sample comes with SPSS Modeler stream (stream/customer-satisfaction-prediction.str) which can be used for that.


# Deployment
For a fast start, you can deploy the pre-built app to Bluemix by clicking the button

[![Deploy to Bluemix](https://bluemix.net/deploy/button.png)](https://bluemix.net/deploy?repository=https://github.com/pmservice/customer-satisfaction-prediction)

Note the application is fully functional only if binded with an instance of *Predictive Analytics* service, which need to be done manually. Check [instructions](#binding-services-in-bluemix) how to do it.

### Manual Bluemix deployment
As an alternative to the button, the application can be manually deployed to Bluemix by pushing it with Cloud Foundry commands, as described in next [section](#push-to-bluemix). Manual deployment is also required when you want to deploy [modified source code](#source-code-changes). Manual deployment consists of [pushing](#push-to-bluemix) the application to Bluemix followed with [binding](#binding-services-in-bluemix) *Predictive Analytics* service to deployed application.

##### Push to Bluemix
To push an application to Bluemix, open a shell, change to directory of your application and execute:
  * `cf api <region>` where <*region*> part may be https://api.ng.bluemix.net or https://api.eu-gb.bluemix.net depending on the Bluemix region you want to work with (US or Europe, respectively)
  * `cf login` which is interactive; provide all required data
  * `cf push <app-name>` where <*app-name*> is the application name of your choice

`cf push` can also read the manifest file, see [Cloud Foundry Documentation](http://docs.cloudfoundry.org/devguide/deploy-apps/manifest.html). If you decide to use manifest, you can hardcode the name of your instance of Predictive Analytics service instead of binding it manually, see *services* section [manifest.yml.template](manifest.yml.template) file.

If this is your first Bluemix Node.js application, refer [documentation of node-helloworld project](https://github.com/IBM-Bluemix/node-helloworld) to gain general experience.

##### Bind Predictive Analytics service
See [instructions](#binding-services-in-bluemix)

### Local deployment
Running the application locally is useful when you want to test your changes before deploying them to Bluemix. To see how to work with source code, see [Source code changes](#source-code-changes).

When the changes are ready, open a shell, change directory to your cloned repository and execute `npm start` to start the application. The running application is available in a browser at http://localhost:6001 url.

Application run locally can also use Bluemix Predictive Analytics service, see [instructions](#link-local-application-with-the-bluemix-environment) how to link it.

## Source code changes
The repository comes with pre-build app. If you want to rebuild application after modifying the sources:
  * Follow steps listed in [Requirements](#requirements) section
  * Change to directory with downloaded source code or cloned git repo
  * Execute `npm install`
  * Execute `./node_modules/.bin/webpack`


# Predictive Analytics service
To empower any application with IBM SPSS Modeler analytics use [Predictive Analytics service API](https://console.ng.bluemix.net/docs/services/PredictiveModeling/index-gentopic1.html#pm_service_api).

The scoring application deals with:
  * Retrieval of all currently deployed models
  * Metadata retrieval for a chosen predictive model
  * Scoring with a chosen predictive model
The code placed in [pm_client.js](server/pm_client.js) is an example of how to employ this API.

## Binding services in Bluemix
As stated in [Requirements](#requirements) section, from Bluemix catalog order an instance of *Predictive Analytics* service if you don't yet have it. Next step is to connect your deployed application with service, which is called *binding*. There are a few options to achieve that in Bluemix environment, [link](https://console.ng.bluemix.net/docs/cfapps/ee.html) describes binding either by Bluemix user interface or by using cf cli.

## Link local application with the Bluemix environment
1. Deploy application to Bluemix and bind it to [Predictive Analytics service][pa].
2. Go to the application overview pane, choose binded Predictive Analytics service and press 'Show Credentials'. Copy the pm-20 *credentials* json part (url, access_key).
3. Create *./config/local.json* file by copying *./config/local.json.template* file. Edit the *local.json* file and paste obtained pm-20 credentials.
4. Start your local application. You should be able to interact with the Predictive Analytics service e.g. by listing the models uploaded.


# License
The code is available under the ??link?? license.
