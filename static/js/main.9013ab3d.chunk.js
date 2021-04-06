(this["webpackJsonpmock-uid-provider"]=this["webpackJsonpmock-uid-provider"]||[]).push([[0],{295:function(e){e.exports=JSON.parse('{"types":{"AccountInfo":"AccountInfoWithRefCount","Address":"IndicesLookupSource","LookupSource":"IndicesLookupSource","ValidatorPrefsWithBlocked":{"commission":"Compact<Perbill>"},"IdentityId":"[u8; 32]","EventDid":"IdentityId","InvestorUid":"[u8; 16]","Ticker":"[u8; 12]","CddId":"[u8; 32]","ScopeId":"[u8; 32]","PosRatio":"(u32, u32)","DocumentId":"u32","DocumentName":"Text","DocumentUri":"Text","DocumentHash":{"_enum":{"None":"","H512":"[u8; 64]","H384":"[u8; 48]","H320":"[u8; 40]","H256":"[u8; 32]","H224":"[u8; 28]","H192":"[u8; 24]","H160":"[u8; 20]","H128":"[u8; 16]"}},"DocumentType":"Text","Document":{"uri":"DocumentUri","content_hash":"DocumentHash","name":"DocumentName","doc_type":"Option<DocumentType>","filing_date":"Option<Moment>"},"Version":"u8","AssetType":{"_enum":{"EquityCommon":"","EquityPreferred":"","Commodity":"","FixedIncome":"","REIT":"","Fund":"","RevenueShareAgreement":"","StructuredProduct":"","Derivative":"","Custom":"Vec<u8>"}},"AssetIdentifier":{"_enum":{"CUSIP":"[u8; 9]","CINS":"[u8; 9]","ISIN":"[u8; 12]","LEI":"[u8; 20]"}},"AssetOwnershipRelation":{"_enum":{"NotOwned":"","TickerOwned":"","AssetOwned":""}},"AssetName":"Text","FundingRoundName":"Text","VenueDetails":"Text","SecurityToken":{"name":"AssetName","total_supply":"Balance","owner_did":"IdentityId","divisible":"bool","asset_type":"AssetType","primary_issuance_agent":"Option<IdentityId>"},"PalletName":"Text","DispatchableName":"Text","PalletPermissions":{"pallet_name":"PalletName","dispatchable_names":"Option<Vec<DispatchableName>>"},"Permissions":{"asset":"Option<Vec<Ticker>>","extrinsic":"Option<Vec<PalletPermissions>>","portfolio":"Option<Vec<PortfolioId>>"},"LegacyPalletPermissions":{"pallet_name":"PalletName","total":"bool","dispatchable_names":"Vec<DispatchableName>"},"LegacyPermissions":{"asset":"Option<Vec<Ticker>>","extrinsic":"Option<Vec<LegacyPalletPermissions>>","portfolio":"Option<Vec<PortfolioId>>"},"Signatory":{"_enum":{"Identity":"IdentityId","Account":"AccountId"}},"SecondaryKey":{"signer":"Signatory","permissions":"Permissions"},"SecondaryKeyWithAuth":{"secondary_key":"SecondaryKey","auth_signature":"Signature"},"IdentityRole":{"_enum":["Issuer","SimpleTokenIssuer","Validator","ClaimIssuer","Investor","NodeRunner","PM","CDDAMLClaimIssuer","AccreditedInvestorClaimIssuer","VerifiedIdentityClaimIssuer"]},"PreAuthorizedKeyInfo":{"target_id":"IdentityId","secondary_key":"SecondaryKey"},"DidRecord":{"primary_key":"AccountId","secondary_keys":"Vec<SecondaryKey>"},"KeyIdentityData":{"identity":"IdentityId","permissions":"Option<Permissions>"},"CountryCode":{"_enum":["AF","AX","AL","DZ","AS","AD","AO","AI","AQ","AG","AR","AM","AW","AU","AT","AZ","BS","BH","BD","BB","BY","BE","BZ","BJ","BM","BT","BO","BA","BW","BV","BR","VG","IO","BN","BG","BF","BI","KH","CM","CA","CV","KY","CF","TD","CL","CN","HK","MO","CX","CC","CO","KM","CG","CD","CK","CR","CI","HR","CU","CY","CZ","DK","DJ","DM","DO","EC","EG","SV","GQ","ER","EE","ET","FK","FO","FJ","FI","FR","GF","PF","TF","GA","GM","GE","DE","GH","GI","GR","GL","GD","GP","GU","GT","GG","GN","GW","GY","HT","HM","VA","HN","HU","IS","IN","ID","IR","IQ","IE","IM","IL","IT","JM","JP","JE","JO","KZ","KE","KI","KP","KR","KW","KG","LA","LV","LB","LS","LR","LY","LI","LT","LU","MK","MG","MW","MY","MV","ML","MT","MH","MQ","MR","MU","YT","MX","FM","MD","MC","MN","ME","MS","MA","MZ","MM","NA","NR","NP","NL","AN","NC","NZ","NI","NE","NG","NU","NF","MP","NO","OM","PK","PW","PS","PA","PG","PY","PE","PH","PN","PL","PT","PR","QA","RE","RO","RU","RW","BL","SH","KN","LC","MF","PM","VC","WS","SM","ST","SA","SN","RS","SC","SL","SG","SK","SI","SB","SO","ZA","GS","SS","ES","LK","SD","SR","SJ","SZ","SE","CH","SY","TW","TJ","TZ","TH","TL","TG","TK","TO","TT","TN","TR","TM","TC","TV","UG","UA","AE","GB","US","UM","UY","UZ","VU","VE","VN","VI","WF","EH","YE","ZM","ZW"]},"Scope":{"_enum":{"Identity":"IdentityId","Ticker":"Ticker","Custom":"Vec<u8>"}},"InvestorZKProofData":"Signature","Claim":{"_enum":{"Accredited":"Scope","Affiliate":"Scope","BuyLockup":"Scope","SellLockup":"Scope","CustomerDueDiligence":"CddId","KnowYourCustomer":"Scope","Jurisdiction":"(CountryCode, Scope)","Exempted":"Scope","Blocked":"Scope","InvestorUniqueness":"(Scope, ScopeId, CddId)","NoData":""}},"ClaimType":{"_enum":{"Accredited":"","Affiliate":"","BuyLockup":"","SellLockup":"","CustomerDueDiligence":"","KnowYourCustomer":"","Jurisdiction":"","Exempted":"","Blocked":"","InvestorUniqueness":"","NoData":""}},"IdentityClaim":{"claim_issuer":"IdentityId","issuance_date":"Moment","last_update_date":"Moment","expiry":"Option<Moment>","claim":"Claim"},"IdentityClaimKey":{"id":"IdentityId","claim_type":"ClaimType"},"ComplianceRequirement":{"sender_conditions":"Vec<Condition>","receiver_conditions":"Vec<Condition>","id":"u32"},"ComplianceRequirementResult":{"sender_conditions":"Vec<ConditionResult>","receiver_conditions":"Vec<ConditionResult>","id":"u32","result":"bool"},"ConditionType":{"_enum":{"IsPresent":"Claim","IsAbsent":"Claim","IsAnyOf":"Vec<Claim>","IsNoneOf":"Vec<Claim>","IsIdentity":"TargetIdentity"}},"TrustedFor":{"_enum":{"Any":"","Specific":"Vec<ClaimType>"}},"TrustedIssuer":{"issuer":"IdentityId","trusted_for":"TrustedFor"},"Condition":{"condition_type":"ConditionType","issuers":"Vec<TrustedIssuer>"},"ConditionResult":{"condition":"Condition","result":"bool"},"SimpleTokenRecord":{"ticker":"Ticker","total_supply":"Balance","owner_did":"IdentityId"},"FeeOf":"Balance","TargetIdAuthorization":{"target_id":"IdentityId","nonce":"u64","expires_at":"Moment"},"TickerRegistration":{"owner":"IdentityId","expiry":"Option<Moment>"},"TickerRegistrationConfig":{"max_ticker_length":"u8","registration_length":"Option<Moment>"},"ClassicTickerRegistration":{"eth_owner":"EthereumAddress","is_created":"bool"},"ClassicTickerImport":{"eth_owner":"EthereumAddress","ticker":"Ticker","is_contract":"bool","is_created":"bool"},"EthereumAddress":"[u8; 20]","EcdsaSignature":"[u8; 65]","MotionTitle":"Text","MotionInfoLink":"Text","ChoiceTitle":"Text","Motion":{"title":"MotionTitle","info_link":"MotionInfoLink","choices":"Vec<ChoiceTitle>"},"BallotTitle":"Text","BallotMeta":{"title":"BallotTitle","motions":"Vec<Motion>"},"BallotTimeRange":{"start":"Moment","end":"Moment"},"BallotVote":{"power":"Balance","fallback":"Option<u16>"},"MaybeBlock":{"_enum":{"Some":"BlockNumber","None":""}},"Url":"Text","PipDescription":"Text","PipsMetadata":{"id":"PipId","url":"Option<Url>","description":"Option<PipDescription>","created_at":"BlockNumber","transaction_version":"u32","expiry":"MaybeBlock"},"Proposer":{"_enum":{"Community":"AccountId","Committee":"Committee"}},"Committee":{"_enum":{"Technical":"","Upgrade":""}},"SkippedCount":"u8","SnapshottedPip":{"id":"PipId","weight":"(bool, Balance)"},"SnapshotId":"u32","SnapshotMetadata":{"created_at":"BlockNumber","made_by":"AccountId","id":"SnapshotId"},"SnapshotResult":{"_enum":{"Approve":"","Reject":"","Skip":""}},"Beneficiary":{"id":"IdentityId","amount":"Balance"},"DepositInfo":{"owner":"AccountId","amount":"Balance"},"PolymeshVotes":{"index":"u32","ayes":"Vec<(IdentityId, Balance)>","nays":"Vec<(IdentityId, Balance)>","end":"BlockNumber","expiry":"MaybeBlock"},"PipId":"u32","ProposalState":{"_enum":["Pending","Rejected","Scheduled","Failed","Executed","Expired"]},"Pip":{"id":"PipId","proposal":"Call","state":"ProposalState","proposer":"Proposer"},"ProposalData":{"_enum":{"Hash":"Hash","Proposal":"Vec<u8>"}},"TickerTransferApproval":{"authorized_by":"IdentityId","next_ticker":"Option<Ticker>","previous_ticker":"Option<Ticker>"},"OffChainSignature":{"_enum":{"Ed25519":"H512","Sr25519":"H512","Ecdsa":"H512"}},"Authorization":{"authorization_data":"AuthorizationData","authorized_by":"IdentityId","expiry":"Option<Moment>","auth_id":"u64"},"AuthorizationData":{"_enum":{"AttestPrimaryKeyRotation":"IdentityId","RotatePrimaryKey":"IdentityId","TransferTicker":"Ticker","TransferPrimaryIssuanceAgent":"Ticker","AddMultiSigSigner":"AccountId","TransferAssetOwnership":"Ticker","JoinIdentity":"Permissions","PortfolioCustody":"PortfolioId","Custom":"Ticker","NoData":"","TransferCorporateActionAgent":"Ticker"}},"AuthIdentifier":{"signatory":"Signatory","auth_id":"u64"},"SmartExtensionType":{"_enum":{"TransferManager":"","Offerings":"","SmartWallet":"","Custom":"Vec<u8>"}},"SmartExtensionName":"Text","SmartExtension":{"extension_type":"SmartExtensionType","extension_name":"SmartExtensionName","extension_id":"AccountId","is_archive":"bool"},"MetaUrl":"Text","MetaDescription":"Text","MetaVersion":"u32","ExtVersion":"u32","TemplateMetadata":{"url":"Option<MetaUrl>","se_type":"SmartExtensionType","usage_fee":"Balance","description":"MetaDescription","version":"MetaVersion"},"TemplateDetails":{"instantiation_fee":"Balance","owner":"IdentityId","frozen":"bool"},"ProportionMatch":{"_enum":["AtLeast","MoreThan"]},"AuthorizationNonce":"u64","Counter":"u64","Percentage":"Permill","TransferManager":{"_enum":{"CountTransferManager":"Counter","PercentageTransferManager":"Percentage"}},"RestrictionResult":{"_enum":["Valid","Invalid","ForceValid"]},"Memo":"[u8;32]","IssueRecipient":{"_enum":{"Account":"AccountId","Identity":"IdentityId"}},"BridgeTx":{"nonce":"u32","recipient":"AccountId","value":"Balance","tx_hash":"H256"},"PendingTx":{"did":"IdentityId","bridge_tx":"BridgeTx"},"OfflineSlashingParams":{"max_offline_percent":"u32","constant":"u32","max_slash_percent":"u32"},"AssetCompliance":{"is_paused":"bool","requirements":"Vec<ComplianceRequirement>"},"AssetComplianceResult":{"paused":"bool","requirements":"Vec<ComplianceRequirementResult>","result":"bool"},"Claim1stKey":{"target":"IdentityId","claim_type":"ClaimType"},"Claim2ndKey":{"issuer":"IdentityId","scope":"Option<Scope>"},"BatchAddClaimItem":{"target":"IdentityId","claim":"Claim","expiry":"Option<Moment>"},"BatchRevokeClaimItem":{"target":"IdentityId","claim":"Claim"},"InactiveMember":{"id":"IdentityId","deactivated_at":"Moment","expiry":"Option<Moment>"},"VotingResult":{"ayes_count":"u32","ayes_stake":"Balance","nays_count":"u32","nays_stake":"Balance"},"ProtocolOp":{"_enum":["AssetRegisterTicker","AssetIssue","AssetAddDocument","AssetCreateAsset","AssetCreateCheckpointSchedule","DividendNew","ComplianceManagerAddComplianceRequirement","IdentityRegisterDid","IdentityCddRegisterDid","IdentityAddClaim","IdentitySetPrimaryKey","IdentityAddSecondaryKeysWithAuthorization","PipsPropose","VotingAddBallot","ContractsPutCode","BallotAttachBallot","DistributionDistribute"]},"CddStatus":{"_enum":{"Ok":"IdentityId","Err":"Vec<u8>"}},"AssetDidResult":{"_enum":{"Ok":"IdentityId","Err":"Vec<u8>"}},"DidRecordsSuccess":{"primary_key":"AccountId","secondary_key":"Vec<SecondaryKey>"},"DidRecords":{"_enum":{"Success":"DidRecordsSuccess","IdNotFound":"Vec<u8>"}},"VoteCountProposalFound":{"ayes":"u64","nays":"u64"},"VoteCount":{"_enum":{"ProposalFound":"VoteCountProposalFound","ProposalNotFound":"Vec<u8>"}},"Vote":"(bool, Balance)","VoteByPip":{"pip":"PipId","vote":"Vote"},"HistoricalVotingByAddress":"Vec<VoteByPip>","HistoricalVotingById":"Vec<(AccountId, HistoricalVotingByAddress)>","BridgeTxDetail":{"amount":"Balance","status":"BridgeTxStatus","execution_block":"BlockNumber","tx_hash":"H256"},"BridgeTxStatus":{"_enum":{"Absent":"","Pending":"u8","Frozen":"","Timelocked":"","Handled":""}},"HandledTxStatus":{"_enum":{"Success":"","Error":"Text"}},"CappedFee":"u64","CanTransferResult":{"_enum":{"Ok":"u8","Err":"Vec<u8>"}},"AuthorizationType":{"_enum":{"AttestPrimaryKeyRotation":"","RotatePrimaryKey":"","TransferTicker":"","TransferPrimaryIssuanceAgent":"","AddMultiSigSigner":"","TransferAssetOwnership":"","JoinIdentity":"","PortfolioCustody":"","Custom":"","NoData":"","TransferCorporateActionAgent":""}},"ProposalDetails":{"approvals":"u64","rejections":"u64","status":"ProposalStatus","expiry":"Option<Moment>","auto_close":"bool"},"ProposalStatus":{"_enum":{"Invalid":"","ActiveOrExpired":"","ExecutionSuccessful":"","ExecutionFailed":"","Rejected":""}},"DidStatus":{"_enum":{"Unknown":"","Exists":"","CddVerified":""}},"PortfolioName":"Text","PortfolioNumber":"u64","PortfolioKind":{"_enum":{"Default":"","User":"PortfolioNumber"}},"PortfolioId":{"did":"IdentityId","kind":"PortfolioKind"},"ProverTickerKey":{"prover":"IdentityId","ticker":"Ticker"},"TickerRangeProof":{"initial_message":"[u8; 32]","final_response":"Vec<u8>","max_two_exp":"u32"},"Moment":"u64","CalendarUnit":{"_enum":["Second","Minute","Hour","Day","Week","Month","Year"]},"CalendarPeriod":{"unit":"CalendarUnit","amount":"u64"},"CheckpointSchedule":{"start":"Moment","period":"CalendarPeriod"},"CheckpointId":"u64","ScheduleId":"u64","StoredSchedule":{"schedule":"CheckpointSchedule","id":"ScheduleId","at":"Moment","remaining":"u32"},"ScheduleSpec":{"start":"Option<Moment>","period":"CalendarPeriod","remaining":"u32"},"InstructionStatus":{"_enum":{"Unknown":"","Pending":""}},"LegStatus":{"_enum":{"PendingTokenLock":"","ExecutionPending":"","ExecutionToBeSkipped":"(AccountId, u64)"}},"AffirmationStatus":{"_enum":{"Unknown":"","Pending":"","Affirmed":"","Rejected":""}},"SettlementType":{"_enum":{"SettleOnAffirmation":"","SettleOnBlock":"BlockNumber"}},"Instruction":{"instruction_id":"u64","venue_id":"u64","status":"InstructionStatus","settlement_type":"SettlementType","created_at":"Option<Moment>","trade_date":"Option<Moment>","value_date":"Option<Moment>"},"Leg":{"from":"PortfolioId","to":"PortfolioId","asset":"Ticker","amount":"Balance"},"Venue":{"creator":"IdentityId","instructions":"Vec<u64>","details":"VenueDetails","venue_type":"VenueType"},"Receipt":{"receipt_uid":"u64","from":"PortfolioId","to":"PortfolioId","asset":"Ticker","amount":"Balance"},"ReceiptMetadata":"Text","ReceiptDetails":{"receipt_uid":"u64","leg_id":"u64","signer":"AccountId","signature":"OffChainSignature","metadata":"ReceiptMetadata"},"UniqueCall":{"nonce":"u64","call":"Call"},"MovePortfolioItem":{"ticker":"Ticker","amount":"Balance"},"WeightToFeeCoefficient":{"coeffInteger":"Balance","coeffFrac":"Perbill","negative":"bool","degree":"u8"},"TargetIdentity":{"_enum":{"PrimaryIssuanceAgent":"","Specific":"IdentityId"}},"FundraiserName":"Text","FundraiserStatus":{"_enum":["Live","Frozen","Closed","ClosedEarly"]},"FundraiserTier":{"total":"Balance","price":"Balance","remaining":"Balance"},"Fundraiser":{"creator":"IdentityId","offering_portfolio":"PortfolioId","offering_asset":"Ticker","raising_portfolio":"PortfolioId","raising_asset":"Ticker","tiers":"Vec<FundraiserTier>","venue_id":"u64","start":"Moment","end":"Option<Moment>","status":"FundraiserStatus","minimum_investment":"Balance"},"VenueType":{"_enum":["Other","Distribution","Sto","Exchange"]},"Payload":{"block_number":"BlockNumber","nominators":"Vec<AccountId>","public":"H256"},"ExtensionAttributes":{"usage_fee":"Balance","version":"MetaVersion"},"Tax":"Permill","TargetIdentities":{"identities":"Vec<IdentityId>","treatment":"TargetTreatment"},"TargetTreatment":{"_enum":["Include","Exclude"]},"CAKind":{"_enum":["PredictableBenefit","UnpredictableBenefit","IssuerNotice","Reorganization","Other"]},"CADetails":"Text","CACheckpoint":{"_enum":{"Scheduled":"(ScheduleId, u64)","Existing":"CheckpointId"}},"RecordDate":{"date":"Moment","checkpoint":"CACheckpoint"},"RecordDateSpec":{"_enum":{"Scheduled":"Moment","ExistingSchedule":"ScheduleId","Existing":"CheckpointId"}},"CorporateAction":{"kind":"CAKind","decl_date":"Moment","record_date":"Option<RecordDate>","details":"Text","targets":"TargetIdentities","default_withholding_tax":"Tax","withholding_tax":"Vec<(IdentityId, Tax)>"},"LocalCAId":"u32","CAId":{"ticker":"Ticker","local_id":"LocalCAId"},"Distribution":{"from":"PortfolioId","currency":"Ticker","per_share":"Balance","amount":"Balance","remaining":"Balance","reclaimed":"bool","payment_at":"Moment","expires_at":"Option<Moment>"},"SlashingSwitch":{"_enum":["Validator","ValidatorAndNominator","None"]},"PriceTier":{"total":"Balance","price":"Balance"},"AssetMigrationError":{"_enum":{"AssetDocumentFail":"(Ticker, DocumentId)"}},"MigrationError":{"_enum":{"DecodeKey":"Vec<u8>","Map":"AssetMigrationError"}},"PermissionedIdentityPrefs":{"intended_count":"u32","running_count":"u32"}},"rpc":{"compliance":{"canTransfer":{"description":"Checks whether a transaction with given parameters is compliant to the compliance manager conditions","params":[{"name":"ticker","type":"Ticker","isOptional":false},{"name":"from_did","type":"Option<IdentityId>","isOptional":false},{"name":"to_did","type":"Option<IdentityId>","isOptional":false},{"name":"blockHash","type":"Hash","isOptional":true}],"type":"AssetComplianceResult"}},"identity":{"isIdentityHasValidCdd":{"description":"use to tell whether the given did has valid cdd claim or not","params":[{"name":"did","type":"IdentityId","isOptional":false},{"name":"buffer_time","type":"u64","isOptional":true},{"name":"blockHash","type":"Hash","isOptional":true}],"type":"CddStatus"},"getAssetDid":{"description":"function is used to query the given ticker DID","params":[{"name":"ticker","type":"Ticker","isOptional":false},{"name":"blockHash","type":"Hash","isOptional":true}],"type":"AssetDidResult"},"getDidRecords":{"description":"Used to get the did record values for a given DID","params":[{"name":"did","type":"IdentityId","isOptional":false},{"name":"blockHash","type":"Hash","isOptional":true}],"type":"DidRecords"},"getDidStatus":{"description":"Retrieve status of the DID","params":[{"name":"did","type":"Vec<IdentityId>","isOptional":false},{"name":"blockHash","type":"Hash","isOptional":true}],"type":"Vec<DidStatus>"},"getFilteredAuthorizations":{"description":"Retrieve authorizations data for a given signatory and filtered using the given authorization type","params":[{"name":"signatory","type":"Signatory","isOptional":false},{"name":"allow_expired","type":"bool","isOptional":false},{"name":"auth_type","type":"AuthorizationType","isOptional":true},{"name":"blockHash","type":"Hash","isOptional":true}],"type":"Vec<Authorization>"},"getKeyIdentityData":{"description":"Query relation between a signing key and a DID","params":[{"name":"acc","type":"AccountId","isOptional":false},{"name":"blockHash","type":"Hash","isOptional":true}],"type":"Option<KeyIdentityData<IdentityId>>"}},"pips":{"getVotes":{"description":"Summary of votes of a proposal given by index","params":[{"name":"index","type":"u32","isOptional":false},{"name":"blockHash","type":"Hash","isOptional":true}],"type":"VoteCount"},"proposedBy":{"description":"Retrieves proposal indices started by address","params":[{"name":"address","type":"AccountId","isOptional":false},{"name":"blockHash","type":"Hash","isOptional":true}],"type":"Vec<u32>"},"votedOn":{"description":"Retrieves proposal address indices voted on","params":[{"name":"address","type":"AccountId","isOptional":false},{"name":"blockHash","type":"Hash","isOptional":true}],"type":"Vec<u32>"},"votingHistoryByAddress":{"description":"Retrieves proposal `address` indices voted on","params":[{"name":"address","type":"AccountId","isOptional":false},{"name":"blockHash","type":"Hash","isOptional":true}],"type":"HistoricalVotingByAddress"},"votingHistoryById":{"description":"Retrieve historical voting of `id` identity","params":[{"name":"id","type":"IdentityId","isOptional":false},{"name":"blockHash","type":"Hash","isOptional":true}],"type":"HistoricalVotingById"}},"protocolFee":{"computeFee":{"description":"Gets the fee of a chargeable extrinsic operation","params":[{"name":"op","type":"ProtocolOp","isOptional":false},{"name":"blockHash","type":"Hash","isOptional":true}],"type":"CappedFee"}},"staking":{"getCurve":{"description":"Retrieves curves parameters","params":[{"name":"blockHash","type":"Hash","isOptional":true}],"type":"Vec<(Perbill, Perbill)>"}},"asset":{"canTransfer":{"description":"Checks whether a transaction with given parameters can take place or not","params":[{"name":"sender","type":"AccountId","isOptional":false},{"name":"from_custodian","type":"Option<IdentityId>","isOptional":false},{"name":"from_portfolio","type":"PortfolioId","isOptional":false},{"name":"to_custodian","type":"Option<IdentityId>","isOptional":false},{"name":"to_portfolio","type":"PortfolioId","isOptional":false},{"name":"ticker","type":"Ticker","isOptional":false},{"name":"value","type":"Balance","isOptional":false},{"name":"blockHash","type":"Hash","isOptional":true}],"type":"CanTransferResult"}}}}')},420:function(e,t,n){},422:function(e,t,n){},431:function(e,t){},461:function(e,t){},478:function(e,t){},481:function(e,t){},483:function(e,t){},493:function(e,t){},495:function(e,t){},521:function(e,t){},523:function(e,t){},528:function(e,t){},530:function(e,t){},537:function(e,t){},539:function(e,t){},550:function(e,t){},552:function(e,t){},564:function(e,t){},567:function(e,t){},602:function(e,t,n){"use strict";n.r(t);var i=n(26),o=n(39),a=n.n(o),r=n(397),s=n.n(r),c=(n(420),n(19)),d=n.n(c),u=n(23),l=n(0),p=(n(422),n(181)),m=n(624),y=n(625),I=n(295),f=n(97),h=n(626),g={alcyone:"wss://alcyone-rpc.polymesh.live",pmf:"wss://pmf.polymath.network",pme:"wss://pme.polymath.network",itn:"wss://itn-rpc.polymesh.live"};var _=function(){var e=Object(o.useState)(null),t=Object(l.a)(e,2),a=t[0],r=t[1],s=Object(o.useState)(""),c=Object(l.a)(s,2),_=c[0],T=c[1],O=Object(o.useState)(""),C=Object(l.a)(O,2),S=C[0],k=C[1],A=Object(o.useState)(),b=Object(l.a)(A,2),P=b[0],x=b[1],M=Object(o.useState)(),v=Object(l.a)(M,2),D=v[0],B=v[1],V=Object(o.useState)(),R=Object(l.a)(V,2),j=R[0],E=R[1],w=Object(o.useState)(),H=Object(l.a)(w,2),N=H[0],F=H[1],K=Object(o.useState)(""),L=Object(l.a)(K,2),U=L[0],G=L[1],z=Object(o.useState)(""),W=Object(l.a)(z,2),J=W[0],q=W[1],Y=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];F(e),t&&setTimeout((function(){return F(void 0)}),3e3)},Z=function(e){return Y(e,!0)},Q=function(){B(void 0),T(""),F(void 0),G(""),q("")};Object(o.useEffect)((function(){var e=function(e){e&&e.length?k(e[0].address):Y(new Error("No accounts found in wallet extension"))};a||new Promise((function(e){setTimeout((function(){return e(null)}),1e3)})).then((function(){Object(p.web3Enable)("Mock uID Provider").then((function(t){console.log(">>>> Extss",t);var n=t.filter((function(e){return"polywallet"===e.name}))[0];n?(r(n),n.network.subscribe((function(e){E(e.name)})),n.network.get().then((function(e){return E(e.name)})),Object(p.web3AccountsSubscribe)(e,{ss58Format:12}),Object(p.web3Accounts)({ss58Format:12}).then(e)):Y(new Error("Please install Polymesh wallet extension from Chrome store"))}))}))}),[a]),Object(o.useEffect)((function(){if(j&&S){Q();var e=g[j];e||Y(new Error("Unknown network: ".concat(j))),Object(p.web3FromAddress)(S).then((function(t){new m.a({provider:new y.a(e),types:I.types,rpc:I.rpc,signer:t.signer}).isReady.then((function(e){x(e)}))}))}}),[j,S]),Object(o.useEffect)((function(){P&&S&&(Q(),P.query.identity.keyToIdentityIds(S).then((function(e){e.isEmpty||B(e.toString())})))}),[P,S]);var X=function(e){e.preventDefault(),G(e.target.value)},$=function(e){e.preventDefault(),q(e.target.value)},ee=function(){var e=Object(u.a)(d.a.mark((function e(t,n,i){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log(">>> uid",i),t.uid.provide({uid:i,did:n,network:j}).then(console.log,Z).catch(Z);case 2:case"end":return e.stop()}}),e)})));return function(t,n,i){return e.apply(this,arguments)}}(),te=function(){var e=Object(u.a)(d.a.mark((function e(t,i){var o,a,r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("Generating uID..."),e.next=3,n.e(3).then(n.bind(null,630));case 3:o=e.sent,a="0x".concat(o.process_create_mocked_investor_uid(i)),r=Object(h.a)(Object(f.a)(a)),console.log(">>> uid",r),t.uid.provide({uid:r,did:i,network:j}).then(console.log,Z).catch(Z);case 8:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),ne="itn"!==j,ie=function(){return a&&P?Object(i.jsxs)(i.Fragment,{children:[Object(i.jsxs)("p",{children:["Network: ",j||"unknown"]}),Object(i.jsxs)("p",{children:["User address: ",S||"unknown"]}),Object(i.jsxs)("p",{children:["DID: ",D||"none"]}),D&&Object(i.jsxs)(i.Fragment,{children:[ne&&Object(i.jsx)("button",{onClick:function(){return te(a,D)},children:"Generate a dummy uID and import it to Polymesh wallet"}),Object(i.jsxs)("p",{children:[Object(i.jsx)("input",{name:"uid",value:J,type:"text",onChange:$}),Object(i.jsx)("button",{onClick:function(){return ee(a,D,J)},children:"Enter uID and import it to Polymesh wallet"})]}),Object(i.jsxs)("p",{children:[Object(i.jsx)("input",{name:"ticker",value:U,type:"text",onChange:X}),Object(i.jsx)("button",{onClick:function(){return function(e){U.length?e.uid.requestProof({ticker:U}).then((function(e){console.log("Data",e),T(e.proof)}),Z).catch(Z):Y(new Error('"Ticker" is required'),!0)}(a)},children:"Use stored uID to generate proof"})]})]})," ",Object(i.jsx)("br",{}),_&&Object(i.jsxs)("span",{children:["Proof: ",JSON.stringify(_,null,3)," "]}),N&&Object(i.jsx)("span",{children:N.message})]}):N?Object(i.jsx)("span",{children:N.message}):Object(i.jsx)("div",{children:"Initalizing API instance ..."})};return Object(i.jsx)("div",{className:"App",children:Object(i.jsx)("header",{className:"App-header",children:Object(i.jsx)(ie,{})})})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(Object(i.jsx)(a.a.StrictMode,{children:Object(i.jsx)(_,{})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[602,1,2]]]);
//# sourceMappingURL=main.9013ab3d.chunk.js.map