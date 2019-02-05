define(function () {
	var konyLoggerModule = require('com/konyenb/boxfileupload/konyLogger');
	var konysa = {};
	konysa.logger = new konyLoggerModule("Box File upload Component");
	return {
		/**
		 * @function constructor
		 * @private
		 * @param {Object} baseConfig
		 * @param {Object} layoutConfig
		 * @param {Object} pspConfig
		 */
		constructor: function (baseConfig, layoutConfig, pspConfig) {
			this._selectedFiles = [];
			this._appUserID = null;
			this._folderID = null;
		},
		/**
		 * @function initGettersSetters
		 * @description function to initialize the init getter setter of the component.
		 * @private
		 */
		initGettersSetters: function () {

			konysa.logger.trace("----------Entering initGettersSetters Function---------", konysa.logger.FUNCTION_ENTRY);
			defineGetter(this, "appUserID", function () {
				konysa.logger.trace("----------Entering appUserID getter---------", konysa.logger.FUNCTION_ENTRY);
				konysa.logger.trace("----------Exiting appUserID getter---------", konysa.logger.FUNCTION_EXIT);
				return this._appUserID;
			});
			defineSetter(this, "appUserID", function (val) {
				konysa.logger.trace("----------Entering appUserID Setter---------", konysa.logger.FUNCTION_ENTRY);
				konysa.logger.trace("----------Exiting appUserID Setter---------", konysa.logger.FUNCTION_EXIT);
				this._appUserID = val;
			});
			defineGetter(this, "folderID", function () {
				konysa.logger.trace("----------Entering folderID getter---------", konysa.logger.FUNCTION_ENTRY);
				konysa.logger.trace("----------Exiting folderID getter---------", konysa.logger.FUNCTION_EXIT);
				return this._folderID;
			});
			defineSetter(this, "folderID", function (val) {
				konysa.logger.trace("----------Entering folderID Setter---------", konysa.logger.FUNCTION_ENTRY);
				konysa.logger.trace("----------Exiting folderID Setter---------", konysa.logger.FUNCTION_EXIT);
				this._folderID = val;
			});
		},
		/**
		 * @function selectFile
		 * @description function to select the file from the system.
		 * @private
		 */
		selectFile: function () {
			konysa.logger.trace("----------Entering isStatusVisible Setter---------", konysa.logger.FUNCTION_ENTRY);
			if (this._appUserID === null) {
				alert("please provide app user id");
				return;
			}
			if (this._folderID === null) {
				alert("please provide folder id");
				return;
			}
			var self = this;
			var fileArray = [];
			var controllerScope = this;
			var config = {
				selectMultipleFiles: false,
				filter: ["image/png", "image/jpeg", "image/jpg", "image/svg"]
			};
			this._selectedFiles = [];
			var browseResponse = kony.io.FileSystem.browse(config, browseCallback.bind(this));
			function browseCallback(event, resultObject) {
				konysa.logger.trace("----------Entering browseCallback---------", konysa.logger.FUNCTION_ENTRY);
				for (var i = 0; i < resultObject.length; i++) {
					fileArray.push(resultObject[i].file);
				}
				this._selectedFiles = fileArray;
				try {
					if (self.onImageSelection !== null && self.onImageSelection !== undefined) {
						self.onImageSelection(fileArray);
					}
				} catch (excp) {
					konysa.logger.error(JSON.stringify(excp), konysa.logger.EXCEPTION);
				}
			}

		},
		/**
		 * @function uploadFileToBackEnd
		 * @description function to uploadFile in the box storage.
		 * @private
		 */
		uploadFileToBackEnd: function () {
			if (this._appUserID === null) {
				alert("please provide app user id");
				return;
			}
			if (this._folderID === null) {
				alert("please provide folder id");
				return;
			}
			if (this._selectedFiles.length === 0) {
				alert("please select an image first!");
				return;
			}
			var fileList = this._selectedFiles;
			try {
				var self = this;
				var xhr = new XMLHttpRequest();
				var params = new FormData();
				var attributes = {
					"name": fileList[0].name,
					"parent": {
						"id": "0"
					}
				};
				params.append("attributes", JSON.stringify(attributes));
				params.append("file", fileList[0]);
				xhr.onreadystatechange = function () {
					konysa.logger.trace("----------Entering onreadystatechange---------", konysa.logger.FUNCTION_ENTRY);
					if (this.readyState == 4) {
						if (this.status == 200) {
							konysa.logger.trace("----------onreadystatechange status 200 ---------", konysa.logger.FUNCTION_ENTRY);
							try {
								var responseFromBk = JSON.parse(this.response);
								if (responseFromBk.entries !== undefined &&
									responseFromBk.entries[0] !== undefined &&
									responseFromBk.entries[0].id !== undefined) {
									self.getUloadedImage(responseFromBk.entries[0].id);
								}else{
                                  kony.application.dismissLoadingScreen();
                                }
							} catch (excp) {
                                kony.application.dismissLoadingScreen();
								konysa.logger.error(JSON.stringify(excp), konysa.logger.EXCEPTION);
							}
						} else {
							try {
								if (self.onUploadFailure !== null && self.onUploadFailure !== undefined) {
									self.onUploadFailure(this.response);
								}
							} catch (excp) {
                              kony.application.dismissLoadingScreen();
								konysa.logger.error(JSON.stringify(excp), konysa.logger.EXCEPTION);
							}
                            kony.application.dismissLoadingScreen();
							konysa.logger.trace("----------onreadystatechange failure callback ---------", konysa.logger.FUNCTION_ENTRY);
							alert("upload failed!");
						}
					}
				};
				var mfURL = KNYMobileFabric.integsvc.BoxAPIUploadService.url;
				var uploadURL = mfURL + "/UploadFilesInFolder";
				xhr.open("POST", uploadURL, true);
				xhr.setRequestHeader("Authorization", this.getAccessToken());
				xhr.setRequestHeader("X-Kony-Authorization", KNYMobileFabric.currentClaimToken);
				xhr.send(params);
			} catch (e) {
                kony.application.dismissLoadingScreen();
				konysa.logger.error(JSON.stringify(e), konysa.logger.EXCEPTION);
				alert(e.message);
			}
		},

		getAccessTokenFromBk: function () {
			try {
				var intObj = KNYMobileFabric.getIntegrationService("BoxAuthorizationService");
				intObj.invokeOperation("getAuthorizationToken", {}, {}, function (response) {
					this.setAccessToken(response.access_token);
					this.uploadFileToBackEnd();
				}
					.bind(this), function (error) {
					alert("something went wrong");
					kony.application.dismissLoadingScreen();
				}
					.bind(this));
			} catch (err) {
				alert("something went wrong");
				kony.application.dismissLoadingScreen();
			}
		},

		getUloadedImage: function (fileID) {
			try {
				var header = {
					"Authorization": this.getAccessToken()
				};
				var data = {
					"fileid": fileID
				};
				var intObj = KNYMobileFabric.getIntegrationService("BoxAPIServices");
				intObj.invokeOperation("getFileURL", header, data,
					function (response) {
					var result = {};
					if (response.shared_link !== undefined) {
						response.shared_link.file_name = this._selectedFiles[0].name;
						result.results = [response.shared_link];
						if (this.onUploadSuccess !== undefined) {
							this.onUploadSuccess(result);
						}
					}

				}.bind(this), function (error) {
					alert("something went wrong");
					kony.application.dismissLoadingScreen();
				}.bind(this));
			} catch (err) {
				alert("something went wrong");
				kony.application.dismissLoadingScreen();
			}
		},

		setAccessToken: function (access_token) {
			this.accessToken = "Bearer " + access_token;
		},

		getAccessToken: function () {
			return this.accessToken;
		},
		uploadFile: function () {
			this.getAccessTokenFromBk();
		}
	};
});

//old code


// define(function() {
//   var konyLoggerModule = require('com/konyenb/boxfileupload/konyLogger');
//   var konysa = {};
//   konysa.logger = new konyLoggerModule("Box File upload Component");
//   return {
//     /**
//      * @function constructor
//      * @private
//      * @param {Object} baseConfig
//      * @param {Object} layoutConfig
//      * @param {Object} pspConfig
//      */
//     constructor: function(baseConfig, layoutConfig, pspConfig) {
//       this._selectedFiles=[];
//       this._appUserID=null;
//       this._folderID=null;
//     },
//     /**
//      * @function initGettersSetters
//      * @description function to initialize the init getter setter of the component.
//      * @private
//      */
//     initGettersSetters: function() {
       
//       konysa.logger.trace("----------Entering initGettersSetters Function---------", konysa.logger.FUNCTION_ENTRY);
//       defineGetter(this,"appUserID",function(){
//         konysa.logger.trace("----------Entering appUserID getter---------", konysa.logger.FUNCTION_ENTRY);
//         konysa.logger.trace("----------Exiting appUserID getter---------", konysa.logger.FUNCTION_EXIT);
//         return this._appUserID;
//       });
//       defineSetter(this,"appUserID",function(val){
//         konysa.logger.trace("----------Entering appUserID Setter---------", konysa.logger.FUNCTION_ENTRY);
//         konysa.logger.trace("----------Exiting appUserID Setter---------", konysa.logger.FUNCTION_EXIT);
//         this._appUserID=val;
//       });
//       defineGetter(this, "folderID", function() {
//         konysa.logger.trace("----------Entering folderID getter---------", konysa.logger.FUNCTION_ENTRY);
//         konysa.logger.trace("----------Exiting folderID getter---------", konysa.logger.FUNCTION_EXIT);
//         return this._folderID;
//       });
//       defineSetter(this, "folderID", function(val) {
//         konysa.logger.trace("----------Entering folderID Setter---------", konysa.logger.FUNCTION_ENTRY);
//         konysa.logger.trace("----------Exiting folderID Setter---------", konysa.logger.FUNCTION_EXIT);
//         this._folderID=val;
//       });
//     },
//     /**
//      * @function selectFile
//      * @description function to select the file from the system.
//      * @private
//      */
//     selectFile:function(){
//       konysa.logger.trace("----------Entering isStatusVisible Setter---------", konysa.logger.FUNCTION_ENTRY);
//       if(this._appUserID===null){
//         alert("please provide app user id");
//         return;
//       }
//       if(this._folderID===null){
//         alert("please provide folder id");
//         return;
//       }
//       var self=this;
//       var fileArray = [];
//       var controllerScope = this;
//       var config = {
//         selectMultipleFiles: true,        
//         filter: ["image/png","image/jpeg","image/jpg","image/svg"]
//       };
//       this._selectedFiles=[];
//       var browseResponse = kony.io.FileSystem.browse(config, browseCallback.bind(this));
//       function browseCallback(event,resultObject){
//         konysa.logger.trace("----------Entering browseCallback---------", konysa.logger.FUNCTION_ENTRY);
//         for(var i=0;i<resultObject.length;i++){
//           fileArray.push(resultObject[i].file);
//         }
//         this._selectedFiles=fileArray;
//         try{
//           if(self.onImageSelection!==null&&self.onImageSelection!==undefined){
//             self.onImageSelection(fileArray);
//           }
//         }catch(excp){
//           konysa.logger.error(JSON.stringify(excp), konysa.logger.EXCEPTION);
//         }
//       }

//     },
//     /**
//      * @function uploadFile
//      * @description function to uploadFile in the box storage.
//      * @private
//      */
//     uploadFile:function(){
//       if(this._appUserID===null){
//         alert("please provide app user id");
//         return;
//       }
//       if(this._folderID===null){
//         alert("please provide folder id");
//         return;
//       }
//       if(this._selectedFiles.length===0){
//         alert("please select an image first!");
//         return;
//       }
//       var fileList=this._selectedFiles;
//       try{
//         var self=this;
//         var xhr = new XMLHttpRequest();
//         var params = new FormData();
//         params.append("appUserID",self._appUserID);
//         params.append("folderID",self._folderID);
//         for(var i=0;i<fileList.length;i++){
//           params.append("fileObject"+i, fileList[i]);
//         }
//         xhr.onreadystatechange=function() {
//           konysa.logger.trace("----------Entering onreadystatechange---------", konysa.logger.FUNCTION_ENTRY);
//           if (this.readyState == 4) {
//             if(this.status==200){
//               konysa.logger.trace("----------onreadystatechange status 200 ---------", konysa.logger.FUNCTION_ENTRY);
//               try{
//                 if(self.onUploadSuccess!==null&&self.onUploadSuccess!==undefined){
//                   self.onUploadSuccess(this.response);
//                 }
//               }catch(excp){
//                 konysa.logger.error(JSON.stringify(excp), konysa.logger.EXCEPTION);
//               }
//             }else{
//               try{
//                 if(self.onUploadFailure!==null&&self.onUploadFailure!==undefined){
//                   self.onUploadFailure(this.response);
//                 }
//               }catch(excp){
//                 konysa.logger.error(JSON.stringify(excp), konysa.logger.EXCEPTION);
//               }
//               konysa.logger.trace("----------onreadystatechange failure callback ---------", konysa.logger.FUNCTION_ENTRY);
//               alert("upload failed!");
//             }
//           }
//         };
//         var mfURL = KNYMobileFabric.integsvc.BoxService.url;
//         var uploadURL = mfURL + "/UploadFilesInFolder";
//         xhr.open("POST", uploadURL, true);
//         xhr.send(params);
//       }catch(e){
//         konysa.logger.error(JSON.stringify(e), konysa.logger.EXCEPTION);
//         alert(e.message);
//       }
//     }
//   };
// });