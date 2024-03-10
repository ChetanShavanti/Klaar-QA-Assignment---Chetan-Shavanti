/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 63.0, "series": [{"data": [[100.0, 5.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/surveys/?name=&organization=false&page=1", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9", "isController": false}, {"data": [[100.0, 5.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22manager%22%2C%22__isnull%22%2C%22true%22%2C%22%22%5D%5D&page_size=10", "isController": false}, {"data": [[600.0, 1.0], [100.0, 4.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/my-nominations/?offset=0&limit=10", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports", "isController": false}, {"data": [[0.0, 1.0], [100.0, 4.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/settings/", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competency_types", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9&offset=9", "isController": false}, {"data": [[0.0, 4.0], [200.0, 3.0], [100.0, 3.0]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports?is_system_report=true", "isController": false}, {"data": [[0.0, 1.0], [100.0, 4.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/department/", "isController": false}, {"data": [[100.0, 5.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_resource/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[17300.0, 1.0], [16900.0, 1.0], [16500.0, 1.0], [15800.0, 1.0], [16000.0, 1.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_classification_categories", "isController": false}, {"data": [[0.0, 33.0], [100.0, 2.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/stats/", "isController": false}, {"data": [[100.0, 5.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/code_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[100.0, 5.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D&basic=true", "isController": false}, {"data": [[0.0, 1.0], [100.0, 4.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/display_settings/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/values/", "isController": false}, {"data": [[0.0, 1.0], [100.0, 4.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/experience/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380", "isController": false}, {"data": [[100.0, 5.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/", "isController": false}, {"data": [[100.0, 5.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/darwinbox/", "isController": false}, {"data": [[0.0, 15.0], [100.0, 5.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reports", "isController": false}, {"data": [[300.0, 1.0], [100.0, 3.0], [200.0, 1.0]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_template_for_org", "isController": false}, {"data": [[100.0, 5.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/?with=", "isController": false}, {"data": [[0.0, 1.0], [100.0, 4.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/skills/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380", "isController": false}, {"data": [[100.0, 5.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/aspiration_settings/", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=action_item", "isController": false}, {"data": [[400.0, 3.0], [500.0, 2.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/department/details/", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_from_groups_ids/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", "isController": false}, {"data": [[300.0, 3.0], [200.0, 2.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/my_objectives/?time_period_id=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=5&sort_by_key=created_at&sort_by_value=DESC", "isController": false}, {"data": [[0.0, 1.0], [100.0, 3.0], [200.0, 1.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/jira_config/", "isController": false}, {"data": [[100.0, 5.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/compensation_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea&limit=10&offset=0", "isController": false}, {"data": [[3300.0, 2.0], [3200.0, 1.0], [3500.0, 1.0], [3700.0, 1.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/dashboard/?weightage_enabled=true", "isController": false}, {"data": [[100.0, 5.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/nylas", "isController": false}, {"data": [[100.0, 5.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_users/user/?org_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&dr_count=false", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=9", "isController": false}, {"data": [[100.0, 14.0], [200.0, 1.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/my-org/", "isController": false}, {"data": [[0.0, 13.0], [100.0, 2.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_ratings_for_org", "isController": false}, {"data": [[100.0, 5.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-config/", "isController": false}, {"data": [[0.0, 1.0], [100.0, 4.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/document/settings/", "isController": false}, {"data": [[400.0, 3.0], [500.0, 2.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/feedback-nomination/?created_by=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&offset=0&limit=10", "isController": false}, {"data": [[400.0, 9.0], [500.0, 1.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=10", "isController": false}, {"data": [[0.0, 63.0], [100.0, 2.0]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_settings_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[100.0, 3.0], [200.0, 2.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/org/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/bulk_import/?page=1&page_size=10", "isController": false}, {"data": [[100.0, 5.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies?type=undefined", "isController": false}, {"data": [[100.0, 15.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea/skills/", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/programs/?search=&offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_pas_keys", "isController": false}, {"data": [[100.0, 15.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/opertaions/", "isController": false}, {"data": [[500.0, 5.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/4d4720e5-9027-4a32-b683-a3ef965009fe/?with=pending_requests%2Cprograms_connected%2Cconnection_availability", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies_for_user?type_id=undefined&for_rate_tab=false&ou_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[100.0, 5.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/pending_surveys/?user=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[100.0, 5.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/eou/", "isController": false}, {"data": [[0.0, 2.0], [100.0, 3.0]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_all_system_reports", "isController": false}, {"data": [[100.0, 5.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/?page=1&page_size=10&search=&get_disabled=true&filter=%5B%5D", "isController": false}, {"data": [[0.0, 6.0], [100.0, 3.0], [200.0, 1.0]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", "isController": false}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22roles%22%2C%22__iregex%22%2C%22(%3F%3C!_)ADMIN%22%2C%22%22%5D%5D&page_size=10", "isController": false}, {"data": [[0.0, 8.0], [100.0, 2.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_org", "isController": false}, {"data": [[0.0, 1.0], [100.0, 4.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-chart/", "isController": false}, {"data": [[100.0, 5.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/razorpay/", "isController": false}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/user_customfield/", "isController": false}, {"data": [[100.0, 5.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/successfactor/", "isController": false}, {"data": [[400.0, 4.0], [500.0, 1.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=9007199254740991", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=9&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=5", "isController": false}, {"data": [[0.0, 2.0], [100.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=goal", "isController": false}, {"data": [[100.0, 5.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&page_size=10", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_user", "isController": false}, {"data": [[0.0, 1.0], [100.0, 3.0], [500.0, 1.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?time_period_ids=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=10", "isController": false}, {"data": [[100.0, 5.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/shortcuts/?mode=all", "isController": false}, {"data": [[100.0, 4.0], [200.0, 1.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 17300.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 5.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 507.0, "series": [{"data": [[0.0, 507.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 13.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 5.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 15.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 1.0, "minX": 1.71007452E12, "maxY": 1.0, "series": [{"data": [[1.71007452E12, 1.0], [1.71007464E12, 1.0], [1.71007458E12, 1.0]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.71007464E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 37.0, "minX": 1.0, "maxY": 16562.6, "series": [{"data": [[1.0, 111.2]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/surveys/?name=&organization=false&page=1", "isController": false}, {"data": [[1.0, 111.2]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/surveys/?name=&organization=false&page=1-Aggregated", "isController": false}, {"data": [[1.0, 96.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9", "isController": false}, {"data": [[1.0, 96.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9-Aggregated", "isController": false}, {"data": [[1.0, 127.4]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22manager%22%2C%22__isnull%22%2C%22true%22%2C%22%22%5D%5D&page_size=10", "isController": false}, {"data": [[1.0, 127.4]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22manager%22%2C%22__isnull%22%2C%22true%22%2C%22%22%5D%5D&page_size=10-Aggregated", "isController": false}, {"data": [[1.0, 227.6]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/my-nominations/?offset=0&limit=10", "isController": false}, {"data": [[1.0, 227.6]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/my-nominations/?offset=0&limit=10-Aggregated", "isController": false}, {"data": [[1.0, 76.8]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports", "isController": false}, {"data": [[1.0, 76.8]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports-Aggregated", "isController": false}, {"data": [[1.0, 106.6]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/settings/", "isController": false}, {"data": [[1.0, 106.6]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/settings/-Aggregated", "isController": false}, {"data": [[1.0, 54.099999999999994]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competency_types", "isController": false}, {"data": [[1.0, 54.099999999999994]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competency_types-Aggregated", "isController": false}, {"data": [[1.0, 87.4]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9&offset=9", "isController": false}, {"data": [[1.0, 87.4]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9&offset=9-Aggregated", "isController": false}, {"data": [[1.0, 144.3]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports?is_system_report=true", "isController": false}, {"data": [[1.0, 144.3]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports?is_system_report=true-Aggregated", "isController": false}, {"data": [[1.0, 112.8]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/department/", "isController": false}, {"data": [[1.0, 112.8]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/department/-Aggregated", "isController": false}, {"data": [[1.0, 109.4]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_resource/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.0, 109.4]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_resource/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-Aggregated", "isController": false}, {"data": [[1.0, 16562.6]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.0, 16562.6]], "isOverall": false, "label": "Test-Aggregated", "isController": true}, {"data": [[1.0, 52.6]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_classification_categories", "isController": false}, {"data": [[1.0, 52.6]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_classification_categories-Aggregated", "isController": false}, {"data": [[1.0, 41.85714285714285]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/stats/", "isController": false}, {"data": [[1.0, 41.85714285714285]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/stats/-Aggregated", "isController": false}, {"data": [[1.0, 117.6]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/code_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.0, 117.6]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/code_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-Aggregated", "isController": false}, {"data": [[1.0, 126.4]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D&basic=true", "isController": false}, {"data": [[1.0, 126.4]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D&basic=true-Aggregated", "isController": false}, {"data": [[1.0, 105.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/display_settings/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.0, 105.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/display_settings/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-Aggregated", "isController": false}, {"data": [[1.0, 91.2]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/values/", "isController": false}, {"data": [[1.0, 91.2]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/values/-Aggregated", "isController": false}, {"data": [[1.0, 109.6]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/experience/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380", "isController": false}, {"data": [[1.0, 109.6]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/experience/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380-Aggregated", "isController": false}, {"data": [[1.0, 159.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/", "isController": false}, {"data": [[1.0, 159.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/-Aggregated", "isController": false}, {"data": [[1.0, 136.8]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/darwinbox/", "isController": false}, {"data": [[1.0, 136.8]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/darwinbox/-Aggregated", "isController": false}, {"data": [[1.0, 95.79999999999998]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reports", "isController": false}, {"data": [[1.0, 95.79999999999998]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reports-Aggregated", "isController": false}, {"data": [[1.0, 205.8]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_template_for_org", "isController": false}, {"data": [[1.0, 205.8]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_template_for_org-Aggregated", "isController": false}, {"data": [[1.0, 113.8]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/?with=", "isController": false}, {"data": [[1.0, 113.8]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/?with=-Aggregated", "isController": false}, {"data": [[1.0, 108.2]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/skills/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380", "isController": false}, {"data": [[1.0, 108.2]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/skills/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380-Aggregated", "isController": false}, {"data": [[1.0, 126.4]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/aspiration_settings/", "isController": false}, {"data": [[1.0, 126.4]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/aspiration_settings/-Aggregated", "isController": false}, {"data": [[1.0, 95.6]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=action_item", "isController": false}, {"data": [[1.0, 95.6]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=action_item-Aggregated", "isController": false}, {"data": [[1.0, 467.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/department/details/", "isController": false}, {"data": [[1.0, 467.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/department/details/-Aggregated", "isController": false}, {"data": [[1.0, 83.0]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_from_groups_ids/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", "isController": false}, {"data": [[1.0, 83.0]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_from_groups_ids/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups-Aggregated", "isController": false}, {"data": [[1.0, 311.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/my_objectives/?time_period_id=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=5&sort_by_key=created_at&sort_by_value=DESC", "isController": false}, {"data": [[1.0, 311.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/my_objectives/?time_period_id=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=5&sort_by_key=created_at&sort_by_value=DESC-Aggregated", "isController": false}, {"data": [[1.0, 123.4]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/jira_config/", "isController": false}, {"data": [[1.0, 123.4]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/jira_config/-Aggregated", "isController": false}, {"data": [[1.0, 120.4]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/compensation_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea&limit=10&offset=0", "isController": false}, {"data": [[1.0, 120.4]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/compensation_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea&limit=10&offset=0-Aggregated", "isController": false}, {"data": [[1.0, 3445.4]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/dashboard/?weightage_enabled=true", "isController": false}, {"data": [[1.0, 3445.4]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/dashboard/?weightage_enabled=true-Aggregated", "isController": false}, {"data": [[1.0, 120.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/nylas", "isController": false}, {"data": [[1.0, 120.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/nylas-Aggregated", "isController": false}, {"data": [[1.0, 128.6]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_users/user/?org_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&dr_count=false", "isController": false}, {"data": [[1.0, 128.6]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_users/user/?org_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&dr_count=false-Aggregated", "isController": false}, {"data": [[1.0, 37.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=9", "isController": false}, {"data": [[1.0, 37.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=9-Aggregated", "isController": false}, {"data": [[1.0, 141.06666666666666]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/my-org/", "isController": false}, {"data": [[1.0, 141.06666666666666]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/my-org/-Aggregated", "isController": false}, {"data": [[1.0, 84.53333333333332]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_ratings_for_org", "isController": false}, {"data": [[1.0, 84.53333333333332]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_ratings_for_org-Aggregated", "isController": false}, {"data": [[1.0, 130.6]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-config/", "isController": false}, {"data": [[1.0, 130.6]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-config/-Aggregated", "isController": false}, {"data": [[1.0, 107.6]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/document/settings/", "isController": false}, {"data": [[1.0, 107.6]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/document/settings/-Aggregated", "isController": false}, {"data": [[1.0, 503.6]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/feedback-nomination/?created_by=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&offset=0&limit=10", "isController": false}, {"data": [[1.0, 503.6]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/feedback-nomination/?created_by=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&offset=0&limit=10-Aggregated", "isController": false}, {"data": [[1.0, 444.4]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=10", "isController": false}, {"data": [[1.0, 444.4]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=10-Aggregated", "isController": false}, {"data": [[1.0, 53.36923076923077]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_settings_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.0, 53.36923076923077]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_settings_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-Aggregated", "isController": false}, {"data": [[1.0, 194.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/org/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.0, 194.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/org/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-Aggregated", "isController": false}, {"data": [[1.0, 96.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/bulk_import/?page=1&page_size=10", "isController": false}, {"data": [[1.0, 96.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/bulk_import/?page=1&page_size=10-Aggregated", "isController": false}, {"data": [[1.0, 131.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D", "isController": false}, {"data": [[1.0, 131.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D-Aggregated", "isController": false}, {"data": [[1.0, 60.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies?type=undefined", "isController": false}, {"data": [[1.0, 60.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies?type=undefined-Aggregated", "isController": false}, {"data": [[1.0, 110.93333333333334]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea/skills/", "isController": false}, {"data": [[1.0, 110.93333333333334]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea/skills/-Aggregated", "isController": false}, {"data": [[1.0, 43.4]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/programs/?search=&offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[1.0, 43.4]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/programs/?search=&offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697-Aggregated", "isController": false}, {"data": [[1.0, 81.8]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_pas_keys", "isController": false}, {"data": [[1.0, 81.8]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_pas_keys-Aggregated", "isController": false}, {"data": [[1.0, 112.66666666666666]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/opertaions/", "isController": false}, {"data": [[1.0, 112.66666666666666]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/opertaions/-Aggregated", "isController": false}, {"data": [[1.0, 566.8]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/4d4720e5-9027-4a32-b683-a3ef965009fe/?with=pending_requests%2Cprograms_connected%2Cconnection_availability", "isController": false}, {"data": [[1.0, 566.8]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/4d4720e5-9027-4a32-b683-a3ef965009fe/?with=pending_requests%2Cprograms_connected%2Cconnection_availability-Aggregated", "isController": false}, {"data": [[1.0, 64.6]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies_for_user?type_id=undefined&for_rate_tab=false&ou_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[1.0, 64.6]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies_for_user?type_id=undefined&for_rate_tab=false&ou_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697-Aggregated", "isController": false}, {"data": [[1.0, 110.8]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/pending_surveys/?user=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[1.0, 110.8]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/pending_surveys/?user=f21dc60a-55d2-43ac-8ad7-2a1aa6362697-Aggregated", "isController": false}, {"data": [[1.0, 136.2]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/eou/", "isController": false}, {"data": [[1.0, 136.2]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/eou/-Aggregated", "isController": false}, {"data": [[1.0, 101.8]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_all_system_reports", "isController": false}, {"data": [[1.0, 101.8]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_all_system_reports-Aggregated", "isController": false}, {"data": [[1.0, 143.4]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/?page=1&page_size=10&search=&get_disabled=true&filter=%5B%5D", "isController": false}, {"data": [[1.0, 143.4]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/?page=1&page_size=10&search=&get_disabled=true&filter=%5B%5D-Aggregated", "isController": false}, {"data": [[1.0, 122.59999999999998]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", "isController": false}, {"data": [[1.0, 122.59999999999998]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups-Aggregated", "isController": false}, {"data": [[1.0, 123.59999999999998]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22roles%22%2C%22__iregex%22%2C%22(%3F%3C!_)ADMIN%22%2C%22%22%5D%5D&page_size=10", "isController": false}, {"data": [[1.0, 123.59999999999998]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22roles%22%2C%22__iregex%22%2C%22(%3F%3C!_)ADMIN%22%2C%22%22%5D%5D&page_size=10-Aggregated", "isController": false}, {"data": [[1.0, 89.6]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_org", "isController": false}, {"data": [[1.0, 89.6]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_org-Aggregated", "isController": false}, {"data": [[1.0, 107.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-chart/", "isController": false}, {"data": [[1.0, 107.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-chart/-Aggregated", "isController": false}, {"data": [[1.0, 117.4]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/razorpay/", "isController": false}, {"data": [[1.0, 117.4]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/razorpay/-Aggregated", "isController": false}, {"data": [[1.0, 113.49999999999999]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/user_customfield/", "isController": false}, {"data": [[1.0, 113.49999999999999]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/user_customfield/-Aggregated", "isController": false}, {"data": [[1.0, 117.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/successfactor/", "isController": false}, {"data": [[1.0, 117.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/successfactor/-Aggregated", "isController": false}, {"data": [[1.0, 469.8]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=9007199254740991", "isController": false}, {"data": [[1.0, 469.8]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=9007199254740991-Aggregated", "isController": false}, {"data": [[1.0, 38.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=9&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=5", "isController": false}, {"data": [[1.0, 38.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=9&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=5-Aggregated", "isController": false}, {"data": [[1.0, 129.6]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=goal", "isController": false}, {"data": [[1.0, 129.6]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=goal-Aggregated", "isController": false}, {"data": [[1.0, 120.8]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&page_size=10", "isController": false}, {"data": [[1.0, 120.8]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&page_size=10-Aggregated", "isController": false}, {"data": [[1.0, 80.2]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_user", "isController": false}, {"data": [[1.0, 80.2]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_user-Aggregated", "isController": false}, {"data": [[1.0, 186.4]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?time_period_ids=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=10", "isController": false}, {"data": [[1.0, 186.4]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?time_period_ids=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=10-Aggregated", "isController": false}, {"data": [[1.0, 130.2]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/shortcuts/?mode=all", "isController": false}, {"data": [[1.0, 130.2]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/shortcuts/?mode=all-Aggregated", "isController": false}, {"data": [[1.0, 173.6]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/", "isController": false}, {"data": [[1.0, 173.6]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 1.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 75.58333333333333, "minX": 1.71007452E12, "maxY": 46586.066666666666, "series": [{"data": [[1.71007452E12, 755.3166666666667], [1.71007464E12, 11913.4], [1.71007458E12, 46586.066666666666]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.71007452E12, 75.58333333333333], [1.71007464E12, 1066.3666666666666], [1.71007458E12, 4092.883333333333]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.71007464E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 35.0, "minX": 1.71007452E12, "maxY": 16803.333333333332, "series": [{"data": [[1.71007464E12, 129.0], [1.71007458E12, 106.75]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/surveys/?name=&organization=false&page=1", "isController": false}, {"data": [[1.71007464E12, 97.0], [1.71007458E12, 95.75]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9", "isController": false}, {"data": [[1.71007464E12, 126.0], [1.71007458E12, 127.75]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22manager%22%2C%22__isnull%22%2C%22true%22%2C%22%22%5D%5D&page_size=10", "isController": false}, {"data": [[1.71007464E12, 127.0], [1.71007458E12, 252.75]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/my-nominations/?offset=0&limit=10", "isController": false}, {"data": [[1.71007464E12, 81.0], [1.71007458E12, 75.75]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports", "isController": false}, {"data": [[1.71007464E12, 123.0], [1.71007458E12, 102.5]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/settings/", "isController": false}, {"data": [[1.71007464E12, 55.0], [1.71007458E12, 53.87499999999999]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competency_types", "isController": false}, {"data": [[1.71007464E12, 90.0], [1.71007458E12, 86.75]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9&offset=9", "isController": false}, {"data": [[1.71007464E12, 137.0], [1.71007458E12, 146.125]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports?is_system_report=true", "isController": false}, {"data": [[1.71007464E12, 118.0], [1.71007458E12, 111.5]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/department/", "isController": false}, {"data": [[1.71007464E12, 109.0], [1.71007458E12, 109.5]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_resource/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.71007464E12, 16201.5], [1.71007458E12, 16803.333333333332]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.71007464E12, 56.0], [1.71007458E12, 51.75]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_classification_categories", "isController": false}, {"data": [[1.71007464E12, 54.71428571428571], [1.71007458E12, 38.64285714285714]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/stats/", "isController": false}, {"data": [[1.71007464E12, 125.0], [1.71007458E12, 115.75]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/code_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.71007464E12, 118.0], [1.71007458E12, 128.5]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D&basic=true", "isController": false}, {"data": [[1.71007464E12, 98.0], [1.71007458E12, 106.75]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/display_settings/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.71007452E12, 86.0], [1.71007464E12, 89.0], [1.71007458E12, 93.66666666666667]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/values/", "isController": false}, {"data": [[1.71007464E12, 109.0], [1.71007458E12, 109.75]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/experience/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380", "isController": false}, {"data": [[1.71007464E12, 152.0], [1.71007458E12, 160.75]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/", "isController": false}, {"data": [[1.71007464E12, 105.0], [1.71007458E12, 144.75]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/darwinbox/", "isController": false}, {"data": [[1.71007464E12, 94.25], [1.71007458E12, 96.1875]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reports", "isController": false}, {"data": [[1.71007464E12, 256.0], [1.71007458E12, 193.25]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_template_for_org", "isController": false}, {"data": [[1.71007464E12, 120.0], [1.71007458E12, 112.25]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/?with=", "isController": false}, {"data": [[1.71007464E12, 97.0], [1.71007458E12, 111.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/skills/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380", "isController": false}, {"data": [[1.71007464E12, 124.0], [1.71007458E12, 127.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/aspiration_settings/", "isController": false}, {"data": [[1.71007464E12, 122.0], [1.71007458E12, 89.0]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=action_item", "isController": false}, {"data": [[1.71007464E12, 438.0], [1.71007458E12, 474.25]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/department/details/", "isController": false}, {"data": [[1.71007464E12, 54.0], [1.71007458E12, 90.25]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_from_groups_ids/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", "isController": false}, {"data": [[1.71007452E12, 268.0], [1.71007464E12, 278.0], [1.71007458E12, 336.3333333333333]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/my_objectives/?time_period_id=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=5&sort_by_key=created_at&sort_by_value=DESC", "isController": false}, {"data": [[1.71007464E12, 95.0], [1.71007458E12, 130.5]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/jira_config/", "isController": false}, {"data": [[1.71007464E12, 119.0], [1.71007458E12, 120.75]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/compensation_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea&limit=10&offset=0", "isController": false}, {"data": [[1.71007464E12, 3210.0], [1.71007458E12, 3504.25]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/dashboard/?weightage_enabled=true", "isController": false}, {"data": [[1.71007464E12, 123.0], [1.71007458E12, 119.25]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/nylas", "isController": false}, {"data": [[1.71007464E12, 121.0], [1.71007458E12, 130.5]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_users/user/?org_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&dr_count=false", "isController": false}, {"data": [[1.71007464E12, 36.0], [1.71007458E12, 37.25]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=9", "isController": false}, {"data": [[1.71007464E12, 133.0], [1.71007458E12, 143.08333333333334]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/my-org/", "isController": false}, {"data": [[1.71007464E12, 110.66666666666667], [1.71007458E12, 77.99999999999999]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_ratings_for_org", "isController": false}, {"data": [[1.71007464E12, 127.0], [1.71007458E12, 131.5]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-config/", "isController": false}, {"data": [[1.71007464E12, 98.0], [1.71007458E12, 110.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/document/settings/", "isController": false}, {"data": [[1.71007464E12, 578.0], [1.71007458E12, 485.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/feedback-nomination/?created_by=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&offset=0&limit=10", "isController": false}, {"data": [[1.71007452E12, 440.0], [1.71007464E12, 476.0], [1.71007458E12, 435.3333333333333]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=10", "isController": false}, {"data": [[1.71007464E12, 61.23076923076924], [1.71007458E12, 51.40384615384615]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_settings_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.71007464E12, 215.0], [1.71007458E12, 188.75]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/org/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.71007452E12, 90.0], [1.71007464E12, 92.0], [1.71007458E12, 99.33333333333333]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/bulk_import/?page=1&page_size=10", "isController": false}, {"data": [[1.71007464E12, 138.0], [1.71007458E12, 129.25]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D", "isController": false}, {"data": [[1.71007464E12, 59.0], [1.71007458E12, 60.25]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies?type=undefined", "isController": false}, {"data": [[1.71007464E12, 108.0], [1.71007458E12, 111.66666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea/skills/", "isController": false}, {"data": [[1.71007464E12, 44.0], [1.71007458E12, 43.25]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/programs/?search=&offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[1.71007464E12, 62.0], [1.71007458E12, 86.75]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_pas_keys", "isController": false}, {"data": [[1.71007452E12, 178.0], [1.71007464E12, 104.33333333333333], [1.71007458E12, 108.99999999999999]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/opertaions/", "isController": false}, {"data": [[1.71007464E12, 534.0], [1.71007458E12, 575.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/4d4720e5-9027-4a32-b683-a3ef965009fe/?with=pending_requests%2Cprograms_connected%2Cconnection_availability", "isController": false}, {"data": [[1.71007464E12, 91.0], [1.71007458E12, 58.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies_for_user?type_id=undefined&for_rate_tab=false&ou_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[1.71007464E12, 107.0], [1.71007458E12, 111.75]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/pending_surveys/?user=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[1.71007464E12, 130.0], [1.71007458E12, 140.33333333333334]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/eou/", "isController": false}, {"data": [[1.71007464E12, 71.0], [1.71007458E12, 109.5]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_all_system_reports", "isController": false}, {"data": [[1.71007464E12, 149.0], [1.71007458E12, 142.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/?page=1&page_size=10&search=&get_disabled=true&filter=%5B%5D", "isController": false}, {"data": [[1.71007464E12, 175.0], [1.71007458E12, 109.49999999999999]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", "isController": false}, {"data": [[1.71007464E12, 116.0], [1.71007458E12, 126.85714285714285]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22roles%22%2C%22__iregex%22%2C%22(%3F%3C!_)ADMIN%22%2C%22%22%5D%5D&page_size=10", "isController": false}, {"data": [[1.71007464E12, 111.0], [1.71007458E12, 84.25]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_org", "isController": false}, {"data": [[1.71007464E12, 103.0], [1.71007458E12, 108.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-chart/", "isController": false}, {"data": [[1.71007464E12, 111.0], [1.71007458E12, 119.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/razorpay/", "isController": false}, {"data": [[1.71007464E12, 112.5], [1.71007458E12, 113.74999999999999]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/user_customfield/", "isController": false}, {"data": [[1.71007464E12, 116.0], [1.71007458E12, 117.25]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/successfactor/", "isController": false}, {"data": [[1.71007452E12, 435.0], [1.71007464E12, 486.0], [1.71007458E12, 476.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=9007199254740991", "isController": false}, {"data": [[1.71007464E12, 35.0], [1.71007458E12, 38.75]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=9&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=5", "isController": false}, {"data": [[1.71007464E12, 213.0], [1.71007458E12, 108.75]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=goal", "isController": false}, {"data": [[1.71007464E12, 122.0], [1.71007458E12, 120.5]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&page_size=10", "isController": false}, {"data": [[1.71007464E12, 84.0], [1.71007458E12, 79.25]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_user", "isController": false}, {"data": [[1.71007452E12, 535.0], [1.71007464E12, 101.0], [1.71007458E12, 98.66666666666667]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?time_period_ids=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=10", "isController": false}, {"data": [[1.71007464E12, 120.0], [1.71007458E12, 132.75]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/shortcuts/?mode=all", "isController": false}, {"data": [[1.71007464E12, 153.0], [1.71007458E12, 178.75]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.71007464E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 35.0, "minX": 1.71007452E12, "maxY": 16508.0, "series": [{"data": [[1.71007464E12, 124.0], [1.71007458E12, 105.75]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/surveys/?name=&organization=false&page=1", "isController": false}, {"data": [[1.71007464E12, 96.0], [1.71007458E12, 95.5]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9", "isController": false}, {"data": [[1.71007464E12, 126.0], [1.71007458E12, 127.5]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22manager%22%2C%22__isnull%22%2C%22true%22%2C%22%22%5D%5D&page_size=10", "isController": false}, {"data": [[1.71007464E12, 127.0], [1.71007458E12, 252.75]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/my-nominations/?offset=0&limit=10", "isController": false}, {"data": [[1.71007464E12, 81.0], [1.71007458E12, 75.75]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports", "isController": false}, {"data": [[1.71007464E12, 123.0], [1.71007458E12, 102.25]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/settings/", "isController": false}, {"data": [[1.71007464E12, 55.0], [1.71007458E12, 53.87499999999999]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competency_types", "isController": false}, {"data": [[1.71007464E12, 90.0], [1.71007458E12, 86.75]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9&offset=9", "isController": false}, {"data": [[1.71007464E12, 137.0], [1.71007458E12, 146.00000000000003]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports?is_system_report=true", "isController": false}, {"data": [[1.71007464E12, 118.0], [1.71007458E12, 111.5]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/department/", "isController": false}, {"data": [[1.71007464E12, 109.0], [1.71007458E12, 109.5]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_resource/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.71007464E12, 15894.5], [1.71007458E12, 16508.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.71007464E12, 56.0], [1.71007458E12, 51.75]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_classification_categories", "isController": false}, {"data": [[1.71007464E12, 54.71428571428571], [1.71007458E12, 38.607142857142854]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/stats/", "isController": false}, {"data": [[1.71007464E12, 125.0], [1.71007458E12, 115.75]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/code_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.71007464E12, 112.0], [1.71007458E12, 122.25]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D&basic=true", "isController": false}, {"data": [[1.71007464E12, 98.0], [1.71007458E12, 106.75]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/display_settings/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.71007452E12, 86.0], [1.71007464E12, 89.0], [1.71007458E12, 93.66666666666667]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/values/", "isController": false}, {"data": [[1.71007464E12, 109.0], [1.71007458E12, 109.75]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/experience/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380", "isController": false}, {"data": [[1.71007464E12, 152.0], [1.71007458E12, 160.75]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/", "isController": false}, {"data": [[1.71007464E12, 104.0], [1.71007458E12, 144.75]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/darwinbox/", "isController": false}, {"data": [[1.71007464E12, 94.25], [1.71007458E12, 96.1875]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reports", "isController": false}, {"data": [[1.71007464E12, 211.0], [1.71007458E12, 172.5]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_template_for_org", "isController": false}, {"data": [[1.71007464E12, 120.0], [1.71007458E12, 112.25]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/?with=", "isController": false}, {"data": [[1.71007464E12, 97.0], [1.71007458E12, 110.75]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/skills/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380", "isController": false}, {"data": [[1.71007464E12, 117.0], [1.71007458E12, 119.25]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/aspiration_settings/", "isController": false}, {"data": [[1.71007464E12, 122.0], [1.71007458E12, 89.0]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=action_item", "isController": false}, {"data": [[1.71007464E12, 426.0], [1.71007458E12, 458.25]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/department/details/", "isController": false}, {"data": [[1.71007464E12, 54.0], [1.71007458E12, 90.25]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_from_groups_ids/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", "isController": false}, {"data": [[1.71007452E12, 263.0], [1.71007464E12, 270.0], [1.71007458E12, 327.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/my_objectives/?time_period_id=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=5&sort_by_key=created_at&sort_by_value=DESC", "isController": false}, {"data": [[1.71007464E12, 95.0], [1.71007458E12, 130.5]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/jira_config/", "isController": false}, {"data": [[1.71007464E12, 119.0], [1.71007458E12, 120.75]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/compensation_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea&limit=10&offset=0", "isController": false}, {"data": [[1.71007464E12, 3208.0], [1.71007458E12, 3503.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/dashboard/?weightage_enabled=true", "isController": false}, {"data": [[1.71007464E12, 123.0], [1.71007458E12, 119.25]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/nylas", "isController": false}, {"data": [[1.71007464E12, 121.0], [1.71007458E12, 130.25]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_users/user/?org_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&dr_count=false", "isController": false}, {"data": [[1.71007464E12, 36.0], [1.71007458E12, 36.5]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=9", "isController": false}, {"data": [[1.71007464E12, 132.66666666666666], [1.71007458E12, 142.33333333333334]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/my-org/", "isController": false}, {"data": [[1.71007464E12, 110.66666666666667], [1.71007458E12, 77.91666666666667]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_ratings_for_org", "isController": false}, {"data": [[1.71007464E12, 127.0], [1.71007458E12, 131.5]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-config/", "isController": false}, {"data": [[1.71007464E12, 98.0], [1.71007458E12, 109.75]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/document/settings/", "isController": false}, {"data": [[1.71007464E12, 578.0], [1.71007458E12, 484.75]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/feedback-nomination/?created_by=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&offset=0&limit=10", "isController": false}, {"data": [[1.71007452E12, 437.5], [1.71007464E12, 474.5], [1.71007458E12, 431.83333333333337]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=10", "isController": false}, {"data": [[1.71007464E12, 49.69230769230769], [1.71007458E12, 41.24999999999999]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_settings_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.71007464E12, 149.0], [1.71007458E12, 165.5]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/org/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.71007452E12, 90.0], [1.71007464E12, 92.0], [1.71007458E12, 99.33333333333333]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/bulk_import/?page=1&page_size=10", "isController": false}, {"data": [[1.71007464E12, 131.0], [1.71007458E12, 121.5]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D", "isController": false}, {"data": [[1.71007464E12, 59.0], [1.71007458E12, 60.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies?type=undefined", "isController": false}, {"data": [[1.71007464E12, 108.0], [1.71007458E12, 111.58333333333331]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea/skills/", "isController": false}, {"data": [[1.71007464E12, 36.0], [1.71007458E12, 36.75]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/programs/?search=&offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[1.71007464E12, 62.0], [1.71007458E12, 86.75]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_pas_keys", "isController": false}, {"data": [[1.71007452E12, 177.0], [1.71007464E12, 104.33333333333333], [1.71007458E12, 108.72727272727273]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/opertaions/", "isController": false}, {"data": [[1.71007464E12, 534.0], [1.71007458E12, 574.75]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/4d4720e5-9027-4a32-b683-a3ef965009fe/?with=pending_requests%2Cprograms_connected%2Cconnection_availability", "isController": false}, {"data": [[1.71007464E12, 91.0], [1.71007458E12, 58.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies_for_user?type_id=undefined&for_rate_tab=false&ou_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[1.71007464E12, 107.0], [1.71007458E12, 111.75]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/pending_surveys/?user=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[1.71007464E12, 129.5], [1.71007458E12, 140.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/eou/", "isController": false}, {"data": [[1.71007464E12, 71.0], [1.71007458E12, 109.5]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_all_system_reports", "isController": false}, {"data": [[1.71007464E12, 141.0], [1.71007458E12, 132.25]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/?page=1&page_size=10&search=&get_disabled=true&filter=%5B%5D", "isController": false}, {"data": [[1.71007464E12, 157.0], [1.71007458E12, 100.625]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", "isController": false}, {"data": [[1.71007464E12, 116.0], [1.71007458E12, 126.85714285714285]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22roles%22%2C%22__iregex%22%2C%22(%3F%3C!_)ADMIN%22%2C%22%22%5D%5D&page_size=10", "isController": false}, {"data": [[1.71007464E12, 111.0], [1.71007458E12, 81.875]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_org", "isController": false}, {"data": [[1.71007464E12, 103.0], [1.71007458E12, 108.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-chart/", "isController": false}, {"data": [[1.71007464E12, 111.0], [1.71007458E12, 119.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/razorpay/", "isController": false}, {"data": [[1.71007464E12, 112.5], [1.71007458E12, 113.74999999999999]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/user_customfield/", "isController": false}, {"data": [[1.71007464E12, 116.0], [1.71007458E12, 117.25]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/successfactor/", "isController": false}, {"data": [[1.71007452E12, 432.0], [1.71007464E12, 483.0], [1.71007458E12, 472.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=9007199254740991", "isController": false}, {"data": [[1.71007464E12, 35.0], [1.71007458E12, 38.75]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=9&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=5", "isController": false}, {"data": [[1.71007464E12, 213.0], [1.71007458E12, 108.75]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=goal", "isController": false}, {"data": [[1.71007464E12, 122.0], [1.71007458E12, 120.5]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&page_size=10", "isController": false}, {"data": [[1.71007464E12, 84.0], [1.71007458E12, 79.25]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_user", "isController": false}, {"data": [[1.71007452E12, 529.0], [1.71007464E12, 101.0], [1.71007458E12, 98.66666666666667]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?time_period_ids=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=10", "isController": false}, {"data": [[1.71007464E12, 120.0], [1.71007458E12, 132.75]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/shortcuts/?mode=all", "isController": false}, {"data": [[1.71007464E12, 153.0], [1.71007458E12, 178.5]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.71007464E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.71007452E12, "maxY": 557.5, "series": [{"data": [[1.71007464E12, 0.0], [1.71007458E12, 0.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/surveys/?name=&organization=false&page=1", "isController": false}, {"data": [[1.71007464E12, 0.0], [1.71007458E12, 0.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9", "isController": false}, {"data": [[1.71007464E12, 0.0], [1.71007458E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22manager%22%2C%22__isnull%22%2C%22true%22%2C%22%22%5D%5D&page_size=10", "isController": false}, {"data": [[1.71007464E12, 0.0], [1.71007458E12, 0.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/my-nominations/?offset=0&limit=10", "isController": false}, {"data": [[1.71007464E12, 0.0], [1.71007458E12, 0.0]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports", "isController": false}, {"data": [[1.71007464E12, 0.0], [1.71007458E12, 0.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/settings/", "isController": false}, {"data": [[1.71007464E12, 0.0], [1.71007458E12, 0.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competency_types", "isController": false}, {"data": [[1.71007464E12, 0.0], [1.71007458E12, 0.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9&offset=9", "isController": false}, {"data": [[1.71007464E12, 0.0], [1.71007458E12, 0.0]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports?is_system_report=true", "isController": false}, {"data": [[1.71007464E12, 0.0], [1.71007458E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/department/", "isController": false}, {"data": [[1.71007464E12, 0.0], [1.71007458E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_resource/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.71007464E12, 557.5], [1.71007458E12, 315.66666666666663]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.71007464E12, 0.0], [1.71007458E12, 0.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_classification_categories", "isController": false}, {"data": [[1.71007464E12, 18.428571428571427], [1.71007458E12, 2.4285714285714284]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/stats/", "isController": false}, {"data": [[1.71007464E12, 0.0], [1.71007458E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/code_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.71007464E12, 0.0], [1.71007458E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D&basic=true", "isController": false}, {"data": [[1.71007464E12, 0.0], [1.71007458E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/display_settings/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.71007452E12, 0.0], [1.71007464E12, 0.0], [1.71007458E12, 0.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/values/", "isController": false}, {"data": [[1.71007464E12, 0.0], [1.71007458E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/experience/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380", "isController": false}, {"data": [[1.71007464E12, 0.0], [1.71007458E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/", "isController": false}, {"data": [[1.71007464E12, 0.0], [1.71007458E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/darwinbox/", "isController": false}, {"data": [[1.71007464E12, 0.0], [1.71007458E12, 0.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reports", "isController": false}, {"data": [[1.71007464E12, 121.0], [1.71007458E12, 17.25]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_template_for_org", "isController": false}, {"data": [[1.71007464E12, 0.0], [1.71007458E12, 0.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/?with=", "isController": false}, {"data": [[1.71007464E12, 0.0], [1.71007458E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/skills/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380", "isController": false}, {"data": [[1.71007464E12, 0.0], [1.71007458E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/aspiration_settings/", "isController": false}, {"data": [[1.71007464E12, 0.0], [1.71007458E12, 0.0]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=action_item", "isController": false}, {"data": [[1.71007464E12, 0.0], [1.71007458E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/department/details/", "isController": false}, {"data": [[1.71007464E12, 0.0], [1.71007458E12, 0.0]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_from_groups_ids/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", "isController": false}, {"data": [[1.71007452E12, 0.0], [1.71007464E12, 0.0], [1.71007458E12, 0.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/my_objectives/?time_period_id=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=5&sort_by_key=created_at&sort_by_value=DESC", "isController": false}, {"data": [[1.71007464E12, 0.0], [1.71007458E12, 30.25]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/jira_config/", "isController": false}, {"data": [[1.71007464E12, 0.0], [1.71007458E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/compensation_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea&limit=10&offset=0", "isController": false}, {"data": [[1.71007464E12, 0.0], [1.71007458E12, 0.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/dashboard/?weightage_enabled=true", "isController": false}, {"data": [[1.71007464E12, 0.0], [1.71007458E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/nylas", "isController": false}, {"data": [[1.71007464E12, 0.0], [1.71007458E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_users/user/?org_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&dr_count=false", "isController": false}, {"data": [[1.71007464E12, 0.0], [1.71007458E12, 0.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=9", "isController": false}, {"data": [[1.71007464E12, 0.0], [1.71007458E12, 10.833333333333334]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/my-org/", "isController": false}, {"data": [[1.71007464E12, 41.66666666666667], [1.71007458E12, 5.416666666666667]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_ratings_for_org", "isController": false}, {"data": [[1.71007464E12, 0.0], [1.71007458E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-config/", "isController": false}, {"data": [[1.71007464E12, 0.0], [1.71007458E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/document/settings/", "isController": false}, {"data": [[1.71007464E12, 128.0], [1.71007458E12, 14.749999999999998]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/feedback-nomination/?created_by=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&offset=0&limit=10", "isController": false}, {"data": [[1.71007452E12, 0.0], [1.71007464E12, 0.0], [1.71007458E12, 0.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=10", "isController": false}, {"data": [[1.71007464E12, 9.23076923076923], [1.71007458E12, 1.2692307692307696]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_settings_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.71007464E12, 0.0], [1.71007458E12, 0.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/org/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.71007452E12, 0.0], [1.71007464E12, 0.0], [1.71007458E12, 0.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/bulk_import/?page=1&page_size=10", "isController": false}, {"data": [[1.71007464E12, 0.0], [1.71007458E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D", "isController": false}, {"data": [[1.71007464E12, 0.0], [1.71007458E12, 0.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies?type=undefined", "isController": false}, {"data": [[1.71007464E12, 0.0], [1.71007458E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea/skills/", "isController": false}, {"data": [[1.71007464E12, 0.0], [1.71007458E12, 0.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/programs/?search=&offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[1.71007464E12, 0.0], [1.71007458E12, 0.0]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_pas_keys", "isController": false}, {"data": [[1.71007452E12, 69.0], [1.71007464E12, 0.0], [1.71007458E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/opertaions/", "isController": false}, {"data": [[1.71007464E12, 0.0], [1.71007458E12, 0.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/4d4720e5-9027-4a32-b683-a3ef965009fe/?with=pending_requests%2Cprograms_connected%2Cconnection_availability", "isController": false}, {"data": [[1.71007464E12, 0.0], [1.71007458E12, 0.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies_for_user?type_id=undefined&for_rate_tab=false&ou_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[1.71007464E12, 0.0], [1.71007458E12, 0.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/pending_surveys/?user=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[1.71007464E12, 0.0], [1.71007458E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/eou/", "isController": false}, {"data": [[1.71007464E12, 0.0], [1.71007458E12, 0.0]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_all_system_reports", "isController": false}, {"data": [[1.71007464E12, 0.0], [1.71007458E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/?page=1&page_size=10&search=&get_disabled=true&filter=%5B%5D", "isController": false}, {"data": [[1.71007464E12, 60.0], [1.71007458E12, 9.25]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", "isController": false}, {"data": [[1.71007464E12, 0.0], [1.71007458E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22roles%22%2C%22__iregex%22%2C%22(%3F%3C!_)ADMIN%22%2C%22%22%5D%5D&page_size=10", "isController": false}, {"data": [[1.71007464E12, 0.0], [1.71007458E12, 0.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_org", "isController": false}, {"data": [[1.71007464E12, 0.0], [1.71007458E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-chart/", "isController": false}, {"data": [[1.71007464E12, 0.0], [1.71007458E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/razorpay/", "isController": false}, {"data": [[1.71007464E12, 0.0], [1.71007458E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/user_customfield/", "isController": false}, {"data": [[1.71007464E12, 0.0], [1.71007458E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/successfactor/", "isController": false}, {"data": [[1.71007452E12, 0.0], [1.71007464E12, 0.0], [1.71007458E12, 0.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=9007199254740991", "isController": false}, {"data": [[1.71007464E12, 0.0], [1.71007458E12, 0.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=9&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=5", "isController": false}, {"data": [[1.71007464E12, 121.0], [1.71007458E12, 15.250000000000002]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=goal", "isController": false}, {"data": [[1.71007464E12, 0.0], [1.71007458E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&page_size=10", "isController": false}, {"data": [[1.71007464E12, 0.0], [1.71007458E12, 0.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_user", "isController": false}, {"data": [[1.71007452E12, 416.0], [1.71007464E12, 0.0], [1.71007458E12, 0.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?time_period_ids=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=10", "isController": false}, {"data": [[1.71007464E12, 0.0], [1.71007458E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/shortcuts/?mode=all", "isController": false}, {"data": [[1.71007464E12, 0.0], [1.71007458E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.71007464E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 32.0, "minX": 1.71007452E12, "maxY": 3751.0, "series": [{"data": [[1.71007452E12, 535.0], [1.71007464E12, 3210.0], [1.71007458E12, 3751.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.71007452E12, 86.0], [1.71007464E12, 35.0], [1.71007458E12, 32.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.71007452E12, 535.0], [1.71007464E12, 217.20000000000005], [1.71007458E12, 182.7000000000001]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.71007452E12, 535.0], [1.71007464E12, 2999.4400000000046], [1.71007458E12, 3065.6499999999633]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.71007452E12, 351.5], [1.71007464E12, 108.0], [1.71007458E12, 103.0]], "isOverall": false, "label": "Median", "isController": false}, {"data": [[1.71007452E12, 535.0], [1.71007464E12, 466.7999999999997], [1.71007458E12, 444.29999999999984]], "isOverall": false, "label": "95th percentile", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.71007464E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 72.5, "minX": 1.0, "maxY": 469.0, "series": [{"data": [[2.0, 304.5], [8.0, 115.0], [9.0, 119.0], [10.0, 104.0], [11.0, 98.0], [3.0, 310.0], [12.0, 79.0], [13.0, 72.5], [4.0, 191.5], [1.0, 469.0], [5.0, 121.0], [6.0, 111.0], [7.0, 107.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[8.0, 105.0], [9.0, 110.0], [10.0, 104.0], [11.0, 111.0], [6.0, 78.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 13.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 72.5, "minX": 1.0, "maxY": 465.0, "series": [{"data": [[2.0, 304.5], [8.0, 115.0], [9.0, 118.0], [10.0, 104.0], [11.0, 98.0], [3.0, 284.0], [12.0, 76.5], [13.0, 72.5], [4.0, 189.0], [1.0, 465.0], [5.0, 121.0], [6.0, 111.0], [7.0, 107.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[8.0, 105.0], [9.0, 110.0], [10.0, 104.0], [11.0, 111.0], [6.0, 78.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 13.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 0.15, "minX": 1.71007452E12, "maxY": 7.033333333333333, "series": [{"data": [[1.71007452E12, 0.15], [1.71007464E12, 1.8166666666666667], [1.71007458E12, 7.033333333333333]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.71007464E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.71007452E12, "maxY": 6.833333333333333, "series": [{"data": [[1.71007452E12, 0.13333333333333333], [1.71007464E12, 1.7833333333333334], [1.71007458E12, 6.833333333333333]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.71007464E12, 0.016666666666666666], [1.71007458E12, 0.06666666666666667]], "isOverall": false, "label": "400", "isController": false}, {"data": [[1.71007464E12, 0.016666666666666666], [1.71007458E12, 0.06666666666666667]], "isOverall": false, "label": "500", "isController": false}, {"data": [[1.71007464E12, 0.016666666666666666], [1.71007458E12, 0.06666666666666667]], "isOverall": false, "label": "404", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.71007464E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.71007452E12, "maxY": 0.8666666666666667, "series": [{"data": [[1.71007464E12, 0.016666666666666666], [1.71007458E12, 0.06666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D-success", "isController": false}, {"data": [[1.71007464E12, 0.016666666666666666], [1.71007458E12, 0.06666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/skills/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380-success", "isController": false}, {"data": [[1.71007464E12, 0.016666666666666666], [1.71007458E12, 0.06666666666666667]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/?with=-success", "isController": false}, {"data": [[1.71007452E12, 0.016666666666666666], [1.71007464E12, 0.016666666666666666], [1.71007458E12, 0.05]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/bulk_import/?page=1&page_size=10-success", "isController": false}, {"data": [[1.71007464E12, 0.016666666666666666], [1.71007458E12, 0.06666666666666667]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/4d4720e5-9027-4a32-b683-a3ef965009fe/?with=pending_requests%2Cprograms_connected%2Cconnection_availability-success", "isController": false}, {"data": [[1.71007464E12, 0.016666666666666666], [1.71007458E12, 0.06666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/?page=1&page_size=10&search=&get_disabled=true&filter=%5B%5D-success", "isController": false}, {"data": [[1.71007464E12, 0.016666666666666666], [1.71007458E12, 0.06666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/department/details/-success", "isController": false}, {"data": [[1.71007464E12, 0.016666666666666666], [1.71007458E12, 0.06666666666666667]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=goal-success", "isController": false}, {"data": [[1.71007452E12, 0.016666666666666666], [1.71007464E12, 0.05], [1.71007458E12, 0.18333333333333332]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/opertaions/-success", "isController": false}, {"data": [[1.71007464E12, 0.016666666666666666], [1.71007458E12, 0.06666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/compensation_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea&limit=10&offset=0-success", "isController": false}, {"data": [[1.71007464E12, 0.05], [1.71007458E12, 0.2]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_ratings_for_org-success", "isController": false}, {"data": [[1.71007464E12, 0.016666666666666666], [1.71007458E12, 0.06666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/experience/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380-success", "isController": false}, {"data": [[1.71007452E12, 0.016666666666666666], [1.71007464E12, 0.016666666666666666], [1.71007458E12, 0.05]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?time_period_ids=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=10-success", "isController": false}, {"data": [[1.71007464E12, 0.21666666666666667], [1.71007458E12, 0.8666666666666667]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_settings_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-success", "isController": false}, {"data": [[1.71007464E12, 0.03333333333333333], [1.71007458E12, 0.13333333333333333]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competency_types-success", "isController": false}, {"data": [[1.71007464E12, 0.016666666666666666], [1.71007458E12, 0.06666666666666667]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_classification_categories-success", "isController": false}, {"data": [[1.71007464E12, 0.016666666666666666], [1.71007458E12, 0.06666666666666667]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_pas_keys-success", "isController": false}, {"data": [[1.71007464E12, 0.016666666666666666], [1.71007458E12, 0.06666666666666667]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/org/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-success", "isController": false}, {"data": [[1.71007464E12, 0.016666666666666666], [1.71007458E12, 0.06666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&page_size=10-success", "isController": false}, {"data": [[1.71007464E12, 0.016666666666666666], [1.71007458E12, 0.06666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_resource/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-success", "isController": false}, {"data": [[1.71007464E12, 0.05], [1.71007458E12, 0.11666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22roles%22%2C%22__iregex%22%2C%22(%3F%3C!_)ADMIN%22%2C%22%22%5D%5D&page_size=10-success", "isController": false}, {"data": [[1.71007464E12, 0.03333333333333333], [1.71007458E12, 0.13333333333333333]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/user_customfield/-success", "isController": false}, {"data": [[1.71007464E12, 0.016666666666666666], [1.71007458E12, 0.06666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/display_settings/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-success", "isController": false}, {"data": [[1.71007464E12, 0.016666666666666666], [1.71007458E12, 0.06666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/-success", "isController": false}, {"data": [[1.71007464E12, 0.016666666666666666], [1.71007458E12, 0.06666666666666667]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=9-success", "isController": false}, {"data": [[1.71007464E12, 0.016666666666666666], [1.71007458E12, 0.06666666666666667]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/pending_surveys/?user=f21dc60a-55d2-43ac-8ad7-2a1aa6362697-success", "isController": false}, {"data": [[1.71007464E12, 0.016666666666666666], [1.71007458E12, 0.06666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/code_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-success", "isController": false}, {"data": [[1.71007464E12, 0.016666666666666666], [1.71007458E12, 0.06666666666666667]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/dashboard/?weightage_enabled=true-success", "isController": false}, {"data": [[1.71007464E12, 0.03333333333333333], [1.71007458E12, 0.13333333333333333]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports?is_system_report=true-success", "isController": false}, {"data": [[1.71007464E12, 0.05], [1.71007458E12, 0.2]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/my-org/-success", "isController": false}, {"data": [[1.71007464E12, 0.016666666666666666], [1.71007458E12, 0.06666666666666667]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9-success", "isController": false}, {"data": [[1.71007464E12, 0.016666666666666666], [1.71007458E12, 0.06666666666666667]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/feedback-nomination/?created_by=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&offset=0&limit=10-success", "isController": false}, {"data": [[1.71007464E12, 0.016666666666666666], [1.71007458E12, 0.06666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-chart/-success", "isController": false}, {"data": [[1.71007464E12, 0.03333333333333333], [1.71007458E12, 0.13333333333333333]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups-success", "isController": false}, {"data": [[1.71007464E12, 0.11666666666666667], [1.71007458E12, 0.4666666666666667]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/stats/-success", "isController": false}, {"data": [[1.71007464E12, 0.03333333333333333], [1.71007458E12, 0.05]], "isOverall": false, "label": "Test-failure", "isController": true}, {"data": [[1.71007464E12, 0.016666666666666666], [1.71007458E12, 0.06666666666666667]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/my-nominations/?offset=0&limit=10-success", "isController": false}, {"data": [[1.71007464E12, 0.016666666666666666], [1.71007458E12, 0.06666666666666667]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports-success", "isController": false}, {"data": [[1.71007452E12, 0.03333333333333333], [1.71007464E12, 0.03333333333333333], [1.71007458E12, 0.1]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=10-success", "isController": false}, {"data": [[1.71007464E12, 0.016666666666666666], [1.71007458E12, 0.06666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/aspiration_settings/-success", "isController": false}, {"data": [[1.71007464E12, 0.016666666666666666], [1.71007458E12, 0.06666666666666667]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9&offset=9-success", "isController": false}, {"data": [[1.71007464E12, 0.03333333333333333], [1.71007458E12, 0.13333333333333333]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_org-success", "isController": false}, {"data": [[1.71007464E12, 0.016666666666666666], [1.71007458E12, 0.06666666666666667]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/programs/?search=&offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697-success", "isController": false}, {"data": [[1.71007464E12, 0.016666666666666666], [1.71007458E12, 0.06666666666666667]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_template_for_org-success", "isController": false}, {"data": [[1.71007464E12, 0.016666666666666666], [1.71007458E12, 0.06666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22manager%22%2C%22__isnull%22%2C%22true%22%2C%22%22%5D%5D&page_size=10-success", "isController": false}, {"data": [[1.71007464E12, 0.016666666666666666], [1.71007458E12, 0.06666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/-success", "isController": false}, {"data": [[1.71007464E12, 0.016666666666666666], [1.71007458E12, 0.06666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/document/settings/-success", "isController": false}, {"data": [[1.71007464E12, 0.016666666666666666], [1.71007458E12, 0.06666666666666667]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_from_groups_ids/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups-failure", "isController": false}, {"data": [[1.71007464E12, 0.016666666666666666], [1.71007458E12, 0.06666666666666667]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies?type=undefined-success", "isController": false}, {"data": [[1.71007464E12, 0.016666666666666666], [1.71007458E12, 0.06666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/darwinbox/-success", "isController": false}, {"data": [[1.71007464E12, 0.03333333333333333], [1.71007458E12, 0.13333333333333333]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_user-success", "isController": false}, {"data": [[1.71007464E12, 0.016666666666666666], [1.71007458E12, 0.06666666666666667]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/jira_config/-failure", "isController": false}, {"data": [[1.71007452E12, 0.016666666666666666], [1.71007464E12, 0.016666666666666666], [1.71007458E12, 0.05]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/values/-success", "isController": false}, {"data": [[1.71007464E12, 0.016666666666666666], [1.71007458E12, 0.06666666666666667]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/surveys/?name=&organization=false&page=1-success", "isController": false}, {"data": [[1.71007464E12, 0.03333333333333333], [1.71007458E12, 0.05]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/eou/-success", "isController": false}, {"data": [[1.71007464E12, 0.016666666666666666], [1.71007458E12, 0.06666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_users/user/?org_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&dr_count=false-success", "isController": false}, {"data": [[1.71007464E12, 0.016666666666666666], [1.71007458E12, 0.06666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/nylas-success", "isController": false}, {"data": [[1.71007464E12, 0.06666666666666667], [1.71007458E12, 0.26666666666666666]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reports-success", "isController": false}, {"data": [[1.71007464E12, 0.016666666666666666], [1.71007458E12, 0.06666666666666667]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/settings/-success", "isController": false}, {"data": [[1.71007464E12, 0.016666666666666666], [1.71007458E12, 0.06666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/successfactor/-success", "isController": false}, {"data": [[1.71007464E12, 0.016666666666666666], [1.71007458E12, 0.06666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/razorpay/-failure", "isController": false}, {"data": [[1.71007464E12, 0.016666666666666666], [1.71007458E12, 0.06666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/department/-success", "isController": false}, {"data": [[1.71007452E12, 0.016666666666666666], [1.71007464E12, 0.016666666666666666], [1.71007458E12, 0.05]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/my_objectives/?time_period_id=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=5&sort_by_key=created_at&sort_by_value=DESC-success", "isController": false}, {"data": [[1.71007452E12, 0.016666666666666666], [1.71007464E12, 0.016666666666666666], [1.71007458E12, 0.05]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=9007199254740991-success", "isController": false}, {"data": [[1.71007464E12, 0.016666666666666666], [1.71007458E12, 0.06666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-config/-success", "isController": false}, {"data": [[1.71007464E12, 0.016666666666666666], [1.71007458E12, 0.06666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/shortcuts/?mode=all-success", "isController": false}, {"data": [[1.71007464E12, 0.016666666666666666], [1.71007458E12, 0.06666666666666667]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies_for_user?type_id=undefined&for_rate_tab=false&ou_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697-success", "isController": false}, {"data": [[1.71007464E12, 0.016666666666666666], [1.71007458E12, 0.06666666666666667]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=9&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=5-success", "isController": false}, {"data": [[1.71007464E12, 0.05], [1.71007458E12, 0.2]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea/skills/-success", "isController": false}, {"data": [[1.71007464E12, 0.016666666666666666], [1.71007458E12, 0.06666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D&basic=true-success", "isController": false}, {"data": [[1.71007464E12, 0.016666666666666666], [1.71007458E12, 0.06666666666666667]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_all_system_reports-success", "isController": false}, {"data": [[1.71007464E12, 0.016666666666666666], [1.71007458E12, 0.06666666666666667]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=action_item-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.71007464E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 0.08333333333333333, "minX": 1.71007452E12, "maxY": 6.833333333333333, "series": [{"data": [[1.71007452E12, 0.13333333333333333], [1.71007464E12, 1.7833333333333334], [1.71007458E12, 6.833333333333333]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.71007464E12, 0.08333333333333333], [1.71007458E12, 0.25]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.71007464E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}
