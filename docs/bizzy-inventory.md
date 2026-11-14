# Bizzy extraction inventory

Source: Bizzy commit 3db9d5a3067fb97bc6123c1ebee804fa94732f37 (read only).

The BISS foundation retains the prior library’s forms, tables, charts, shells,
code blocks and feedback components with renamed APIs and Bizzy-inspired tokens.
Toolbar is a new composition primitive for Bizzy’s shared toolbar pattern.
There are now 154 components in each framework, including generalized editing, sharing, document and dashboard patterns. The following
inventory covers every source component; backend-dependent pieces
are candidates for host adapters, not drop-in package exports.

| Source | Disposition |
|---|---|
| app/components/AccessButton.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/AccessPanel.vue | Generalized as BissSharePanel in both frameworks; application data and persistence stay in the host |
| app/components/AccessTile.vue | Generalized as BissAccessList in both frameworks; application data and persistence stay in the host |
| app/components/AiUsagePanel.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/AlertLine.vue | Ported and generalized as BissAlertLine in Vue and Svelte |
| app/components/AppFooter.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/AppSidebar.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/AskBizzyButton.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/BAvatar.vue | Ported and generalized as BissAvatar in Vue and Svelte |
| app/components/BBrand.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/BDialog.vue | Adapted as BissDialog in both frameworks; see documented scope and host events |
| app/components/BIcon.vue | Ported and generalized as BissIcon in Vue and Svelte |
| app/components/BLogo.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/BLogos.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/BMenu.vue | Adapted as BissMenu in both frameworks; see documented scope and host events |
| app/components/BPop.vue | Adapted as BissPopover in both frameworks; see documented scope and host events |
| app/components/BSelect.vue | Adapted as BissSelectPicker in both frameworks; see documented scope and host events |
| app/components/BWordmark.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/BizzyAction.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/BizzyAiNote.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/BizzyChat.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/BizzyChatList.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/BizzyFigure.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/BizzyHome.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/BizzyMascot.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/BizzyMemory.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/BizzyParts.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/BoardCalendar.vue | Adapted as BissCalendar in both frameworks; see documented scope and host events |
| app/components/BoardCell.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/BoardChart.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/BoardColumnPanel.vue | Generalized as BissColumnManager in both frameworks; application data and persistence stay in the host |
| app/components/BoardFilters.vue | Generalized as BissFilterBuilder in both frameworks; application data and persistence stay in the host |
| app/components/BoardItem.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/BoardKanban.vue | Adapted as BissKanban in both frameworks; see documented scope and host events |
| app/components/BoardProject.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/BoardTable.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/BoardTimeline.vue | Adapted as BissTimeline in both frameworks; see documented scope and host events |
| app/components/BoardViewTools.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/BudgetLinesList.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/BudgetPersonnel.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/BudgetSettings.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/CalcColumnDialog.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/CapacityBar.vue | Adapted as BissCapacityBar in both frameworks; see documented scope and host events |
| app/components/CellPop.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/ChartBlock.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/ChartLegend.vue | Ported and generalized as BissChartLegend in Vue and Svelte |
| app/components/CollabCarets.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/CollabField.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/ColumnSettings.vue | Generalized as BissColumnManager in both frameworks; application data and persistence stay in the host |
| app/components/ConfirmHost.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/CostLineDialog.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/CostRequestDialog.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/CostRequestPanel.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/DTile.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/DashFilterBar.vue | Generalized as BissFilterBuilder in both frameworks; application data and persistence stay in the host |
| app/components/DateField.vue | Adapted as BissDateField in both frameworks; see documented scope and host events |
| app/components/DatePicker.vue | Adapted as BissDatePicker in both frameworks; see documented scope and host events |
| app/components/DatePop.vue | Next extraction: isolate interaction, keyboard and focus contract; remove app dependencies |
| app/components/DbBlock.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/DealBudget.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/DealInvoices.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/DealItem.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/DealOrgs.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/DealProject.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/DealTeam.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/DeliverableNewDialog.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/DeliverablePanel.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/DocBlock.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/DocGithub.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/DocIcon.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/DocMedia.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/DocRecord.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/DocText.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/DocToc.vue | Generalized as BissDocumentToc in both frameworks; application data and persistence stay in the host |
| app/components/DocumentNewDialog.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/DocumentPanel.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/EditCell.vue | Adapted as BissEditableText in both frameworks; see documented scope and host events |
| app/components/EmptyState.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/ExportMenu.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/FeedbackDialog.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/FigureHelp.vue | Generalized as BissFigureHelp in both frameworks; application data and persistence stay in the host |
| app/components/FigureYears.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/FiguresDrill.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/FiguresFormula.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/FiguresFormulaEdit.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/FiguresRules.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/FiguresSheet.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/FiguresTerm.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/FinanceBudgets.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/FinanceCosts.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/FinanceReconcile.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/FinanceRequests.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/ForecastChart.vue | Adapted as BissLineChart in both frameworks; see documented scope and host events |
| app/components/ForecastScenario.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/FunderTile.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/GoalBar.vue | Ported and generalized as BissGoalBar in Vue and Svelte |
| app/components/GoalBlock.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/GoalCard.vue | Adapted as BissGoalCard in both frameworks; see documented scope and host events |
| app/components/GoalsTile.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/GroupedBars.vue | Adapted as BissGroupedBars in both frameworks; see documented scope and host events |
| app/components/HeaderAction.vue | Adapted as BissHeaderAction in both frameworks; see documented scope and host events |
| app/components/HomeCard.vue | Adapted as BissHomeCard in both frameworks; see documented scope and host events |
| app/components/HomeGallery.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/HomeGrid.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/HomeNewDefault.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/HomeOptions.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/HomePreview.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/HomeProposal.vue | Generalized as BissProposalCard in both frameworks; application data and persistence stay in the host |
| app/components/HomeSkel.vue | Ported and generalized as BissHomeSkel in Vue and Svelte |
| app/components/HrReviewTile.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/ImportMapper.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/ImportSteps.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/InvoiceSnooze.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/InvoiceTable.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/ItemDeliverables.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/KrCheckin.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/KrMetric.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/KrRow.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/LabelEditor.vue | Generalized as BissLabelEditor in both frameworks; application data and persistence stay in the host |
| app/components/LanguageMenu.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/LiveStatus.vue | Adapted as BissLiveStatus in both frameworks; see documented scope and host events |
| app/components/LogList.vue | Adapted as BissActivityList in both frameworks; see documented scope and host events |
| app/components/MeetingActions.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/MeetingAgenda.vue | Generalized as BissAgenda in both frameworks; application data and persistence stay in the host |
| app/components/MeetingAttendees.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/MeetingDecisions.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/MeetingLinks.vue | Generalized as BissQuickLinks in both frameworks; application data and persistence stay in the host |
| app/components/MeetingNewDialog.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/MeetingNotes.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/MeetingPanel.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/MeetingPrep.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/MeetingProps.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/MeetingSummaryDialog.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/MeetingTemplateDialog.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/MiniChart.vue | Adapted as BissMiniChart in both frameworks; see documented scope and host events |
| app/components/MyWorkBoard.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/NoAccess.vue | Adapted as BissNoAccess in both frameworks; see documented scope and host events |
| app/components/NoticeRow.vue | Ported and generalized as BissNoticeRow in Vue and Svelte |
| app/components/NotificationsBell.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/NotificationsPanel.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/OnboardingChecklist.vue | Adapted as BissChecklist in both frameworks; see documented scope and host events |
| app/components/OnboardingChips.vue | Adapted as BissOnboardingChips in both frameworks; see documented scope and host events |
| app/components/OnboardingFrame.vue | Adapted as BissOnboardingFrame in both frameworks; see documented scope and host events |
| app/components/OrgCell.vue | Adapted as BissRecordChip in both frameworks; see documented scope and host events |
| app/components/OrgSetup.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/OutcomesChart.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/PageBar.vue | Ported and generalized as BissPageBar in Vue and Svelte |
| app/components/PageHint.vue | Adapted as BissPageHint in both frameworks; see documented scope and host events |
| app/components/PageMore.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/PageSummary.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/PeopleCell.vue | Adapted as BissPeopleCell in both frameworks; see documented scope and host events |
| app/components/PersonBriefing.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/PersonErase.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/PersonInvite.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/PersonMerge.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/PersonPlanning.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/PlanGrid.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/PlanLinkDialog.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/PlanProjectCell.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/PlanSplitDialog.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/PlanTaskDialog.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/PlanningBoardView.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/PlanningDeals.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/PlanningDrill.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/PlanningPeople.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/PlanningReconcile.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/PresenceStack.vue | Adapted as BissPresenceStack in both frameworks; see documented scope and host events |
| app/components/ProjectCell.vue | Adapted as BissRecordChip in both frameworks; see documented scope and host events |
| app/components/ProjectDealCell.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/ProjectDeliverables.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/ProjectOverview.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/PropCell.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/PropFields.vue | Adapted as BissPropertyList in both frameworks; see documented scope and host events |
| app/components/ProposalCard.vue | Generalized as BissProposalCard in both frameworks; application data and persistence stay in the host |
| app/components/PublicLinkDialog.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/ReachSample.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/ReceivablesAging.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/RecordDashboards.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/RecordDocuments.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/RecordMeetings.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/RecordTable.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/RecordsDrawer.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/RecordsTable.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/ReminderSettings.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/ReportBlocks.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/ReviewAssign.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/ReviewThread.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/RoleEditor.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/SaveBar.vue | Ported and generalized as BissSaveBar in Vue and Svelte |
| app/components/SearchPalette.vue | Adapted as BissSearchPalette in both frameworks; see documented scope and host events |
| app/components/SettingsHead.vue | Ported and generalized as BissSettingsHead in Vue and Svelte |
| app/components/SidePanel.vue | Adapted as BissSidePanel in both frameworks; see documented scope and host events |
| app/components/SlashMenu.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/StartMeetingButton.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/StatusCell.vue | Adapted as BissStatusCell in both frameworks; see documented scope and host events |
| app/components/StructurePreview.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/SummaryButton.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/SummaryColumnEditor.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/SummaryEditor.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/SummaryFigureEditor.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/SummaryFigureLook.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/SummaryProposal.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/SummaryStrip.vue | Ported and generalized as BissSummaryStrip in Vue and Svelte |
| app/components/SwatchPicker.vue | Adapted as BissSwatchPicker in both frameworks; see documented scope and host events |
| app/components/TableAddRow.vue | Adapted as BissTableAddRow in both frameworks; see documented scope and host events |
| app/components/TableGroup.vue | Adapted as BissTableGroup in both frameworks; see documented scope and host events |
| app/components/TableHead.vue | Adapted as BissTableHead in both frameworks; see documented scope and host events |
| app/components/TablePager.vue | Ported and generalized as BissTablePager in Vue and Svelte |
| app/components/TableTotal.vue | Adapted as BissTableTotal in both frameworks; see documented scope and host events |
| app/components/TeamCapacity.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/TeamHr.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/TeamInvite.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/TeamSetup.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/ToolButton.vue | Adapted as BissToolButton in both frameworks; see documented scope and host events |
| app/components/ToolNew.vue | Adapted as BissToolNew in both frameworks; see documented scope and host events |
| app/components/ToolSearch.vue | Adapted as BissToolSearch in both frameworks; see documented scope and host events |
| app/components/TooltipHost.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/TourHost.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/TourLink.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/ValuePicker.vue | Adapted as BissValuePicker in both frameworks; see documented scope and host events |
| app/components/ViaBizzy.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/ViewTabs.vue | Ported and generalized as BissViewTabs in Vue and Svelte |
| app/components/WidgetView.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/WorkspaceJobs.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/WorkspaceSwitcher.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/WorkspaceTemplates.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/WorkspaceTransfer.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/YourAccess.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/connections/DataSources.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/connections/FundingCalls.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/connections/LinkedinImport.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/connections/LinkedinPosts.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/connections/Meetings.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/connections/MoreSources.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/connections/PurePeople.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/connections/RepoCard.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/connections/SourceImport.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/connections/TestResult.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/connections/Webhook.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/connections/WebsiteMatches.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/connections/WebsitePage.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/home/Activity.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/home/ActsYear.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/home/Away.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/home/Bizzy.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/home/Block.vue | Generalized as BissDataTile in both frameworks; application data and persistence stay in the host |
| app/components/home/Budgets.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/home/ByType.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/home/Calls.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/home/Capacity.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/home/CostRequests.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/home/Costs.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/home/Coverage.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/home/Dashboard.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/home/Deadlines.vue | Generalized as BissDeadlineList in both frameworks; application data and persistence stay in the host |
| app/components/home/Deals.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/home/Events.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/home/FcChart.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/home/FcCoverage.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/home/FcFigure.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/home/FcLarge.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/home/FcPipeline.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/home/FcTable.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/home/FcUncovered.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/home/FcWhatIf.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/home/FigureRows.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/home/FinAging.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/home/FinMonths.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/home/FinYears.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/home/Forecast.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/home/Funders.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/home/Funnel.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/home/Goals.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/home/GoalsYear.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/home/Invoices.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/home/Kpis.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/home/Links.vue | Generalized as BissQuickLinks in both frameworks; application data and persistence stay in the host |
| app/components/home/Meetings.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/home/Mentions.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/home/Money.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/home/Note.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/home/Outcomes.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/home/Pinned.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/home/PipeTable.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/home/Pis.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/home/Projects.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/home/Reach.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/home/Recent.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/home/Record.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/home/Review.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/home/Section.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/home/Steward.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/home/Tasks.vue | Generalized as BissTaskList in both frameworks; application data and persistence stay in the host |
| app/components/home/Timeline.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/home/Week.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/home/WinRate.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/integrations/McpTools.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/landing/About.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/landing/Bizzy.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/landing/Close.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/landing/Coming.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/landing/Ctas.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/landing/Data.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/landing/Figure.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/landing/Footer.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/landing/Header.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/landing/Hero.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/landing/MockBoards.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/landing/MockColumns.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/landing/MockDeals.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/landing/MockHome.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/landing/MockPeople.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/landing/Tour.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/landing/Trust.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/landing/Video.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/landing/Workspaces.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/updates/Composer.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/updates/Doc.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/updates/Editor.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/updates/Feed.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/updates/Item.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/updates/Lightbox.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/updates/LinkCards.vue | Application composition: retain in host or extract with an explicit data/action adapter |
| app/components/updates/RecordChip.vue | Application composition: retain in host or extract with an explicit data/action adapter |

## Scope of the remaining application compositions

A backend dependency is not by itself a reason to exclude a visual pattern.
The ports above replace persistence with typed data and events. The remaining
application compositions include rich collaborative document editing, permission
management, finance/planning calculations, dashboard configuration, notification
transport, AI chat protocols and connectors. Their domain engines are not bundled
into this UI package. Board view ports intentionally accept a small neutral data
model; they do not claim the full capabilities of Bizzy's BoardTable.
