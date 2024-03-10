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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 127.0, "series": [{"data": [[0.0, 1.0], [100.0, 9.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/surveys/?name=&organization=false&page=1", "isController": false}, {"data": [[0.0, 6.0], [100.0, 4.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9", "isController": false}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22manager%22%2C%22__isnull%22%2C%22true%22%2C%22%22%5D%5D&page_size=10", "isController": false}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/my-nominations/?offset=0&limit=10", "isController": false}, {"data": [[0.0, 9.0], [100.0, 1.0]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports", "isController": false}, {"data": [[0.0, 5.0], [100.0, 4.0], [200.0, 1.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/settings/", "isController": false}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competency_types", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9&offset=9", "isController": false}, {"data": [[0.0, 10.0], [100.0, 9.0], [200.0, 1.0]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports?is_system_report=true", "isController": false}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/department/", "isController": false}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_resource/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[16800.0, 3.0], [16600.0, 3.0], [16400.0, 1.0], [19300.0, 1.0], [15900.0, 1.0], [16100.0, 1.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_classification_categories", "isController": false}, {"data": [[0.0, 67.0], [300.0, 1.0], [100.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/stats/", "isController": false}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/code_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D&basic=true", "isController": false}, {"data": [[0.0, 1.0], [100.0, 9.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/display_settings/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[0.0, 8.0], [100.0, 2.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/values/", "isController": false}, {"data": [[0.0, 1.0], [100.0, 9.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/experience/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380", "isController": false}, {"data": [[200.0, 1.0], [100.0, 9.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/", "isController": false}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/darwinbox/", "isController": false}, {"data": [[0.0, 29.0], [100.0, 11.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reports", "isController": false}, {"data": [[300.0, 1.0], [200.0, 2.0], [100.0, 7.0]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_template_for_org", "isController": false}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/?with=", "isController": false}, {"data": [[0.0, 1.0], [100.0, 9.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/skills/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380", "isController": false}, {"data": [[100.0, 8.0], [400.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/aspiration_settings/", "isController": false}, {"data": [[0.0, 8.0], [100.0, 2.0]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=action_item", "isController": false}, {"data": [[400.0, 4.0], [500.0, 6.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/department/details/", "isController": false}, {"data": [[0.0, 9.0], [100.0, 1.0]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_from_groups_ids/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", "isController": false}, {"data": [[300.0, 8.0], [200.0, 2.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/my_objectives/?time_period_id=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=5&sort_by_key=created_at&sort_by_value=DESC", "isController": false}, {"data": [[0.0, 4.0], [100.0, 4.0], [200.0, 2.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/jira_config/", "isController": false}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/compensation_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea&limit=10&offset=0", "isController": false}, {"data": [[3000.0, 1.0], [3100.0, 1.0], [3200.0, 2.0], [3400.0, 1.0], [3700.0, 2.0], [3600.0, 2.0], [3800.0, 1.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/dashboard/?weightage_enabled=true", "isController": false}, {"data": [[100.0, 9.0], [200.0, 1.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/nylas", "isController": false}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_users/user/?org_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&dr_count=false", "isController": false}, {"data": [[0.0, 9.0], [100.0, 1.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=9", "isController": false}, {"data": [[100.0, 29.0], [200.0, 1.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/my-org/", "isController": false}, {"data": [[0.0, 27.0], [100.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_ratings_for_org", "isController": false}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-config/", "isController": false}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/document/settings/", "isController": false}, {"data": [[600.0, 1.0], [400.0, 6.0], [500.0, 3.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/feedback-nomination/?created_by=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&offset=0&limit=10", "isController": false}, {"data": [[300.0, 1.0], [400.0, 14.0], [500.0, 5.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=10", "isController": false}, {"data": [[0.0, 127.0], [100.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_settings_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[200.0, 4.0], [100.0, 6.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/org/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[0.0, 5.0], [100.0, 5.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/bulk_import/?page=1&page_size=10", "isController": false}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies?type=undefined", "isController": false}, {"data": [[0.0, 1.0], [100.0, 29.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea/skills/", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/programs/?search=&offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[0.0, 8.0], [100.0, 2.0]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_pas_keys", "isController": false}, {"data": [[0.0, 3.0], [100.0, 26.0], [1700.0, 1.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/opertaions/", "isController": false}, {"data": [[600.0, 2.0], [500.0, 8.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/4d4720e5-9027-4a32-b683-a3ef965009fe/?with=pending_requests%2Cprograms_connected%2Cconnection_availability", "isController": false}, {"data": [[0.0, 9.0], [100.0, 1.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies_for_user?type_id=undefined&for_rate_tab=false&ou_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/pending_surveys/?user=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[100.0, 9.0], [200.0, 1.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/eou/", "isController": false}, {"data": [[0.0, 5.0], [100.0, 5.0]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_all_system_reports", "isController": false}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/?page=1&page_size=10&search=&get_disabled=true&filter=%5B%5D", "isController": false}, {"data": [[0.0, 10.0], [300.0, 1.0], [100.0, 7.0], [200.0, 2.0]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", "isController": false}, {"data": [[100.0, 20.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22roles%22%2C%22__iregex%22%2C%22(%3F%3C!_)ADMIN%22%2C%22%22%5D%5D&page_size=10", "isController": false}, {"data": [[0.0, 17.0], [100.0, 3.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_org", "isController": false}, {"data": [[0.0, 3.0], [100.0, 6.0], [200.0, 1.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-chart/", "isController": false}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/razorpay/", "isController": false}, {"data": [[100.0, 20.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/user_customfield/", "isController": false}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/successfactor/", "isController": false}, {"data": [[400.0, 9.0], [500.0, 1.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=9007199254740991", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=9&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=5", "isController": false}, {"data": [[0.0, 3.0], [200.0, 3.0], [100.0, 4.0]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=goal", "isController": false}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&page_size=10", "isController": false}, {"data": [[0.0, 19.0], [100.0, 1.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_user", "isController": false}, {"data": [[0.0, 4.0], [400.0, 1.0], [100.0, 5.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?time_period_ids=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=10", "isController": false}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/shortcuts/?mode=all", "isController": false}, {"data": [[200.0, 2.0], [100.0, 8.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 19300.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 11.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 1014.0, "series": [{"data": [[0.0, 1014.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 25.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 11.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 30.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 1.0, "minX": 1.71007464E12, "maxY": 1.0, "series": [{"data": [[1.7100747E12, 1.0], [1.71007482E12, 1.0], [1.71007464E12, 1.0], [1.71007476E12, 1.0]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.71007482E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 37.300000000000004, "minX": 1.0, "maxY": 16852.1, "series": [{"data": [[1.0, 110.19999999999999]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/surveys/?name=&organization=false&page=1", "isController": false}, {"data": [[1.0, 110.19999999999999]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/surveys/?name=&organization=false&page=1-Aggregated", "isController": false}, {"data": [[1.0, 96.4]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9", "isController": false}, {"data": [[1.0, 96.4]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9-Aggregated", "isController": false}, {"data": [[1.0, 132.5]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22manager%22%2C%22__isnull%22%2C%22true%22%2C%22%22%5D%5D&page_size=10", "isController": false}, {"data": [[1.0, 132.5]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22manager%22%2C%22__isnull%22%2C%22true%22%2C%22%22%5D%5D&page_size=10-Aggregated", "isController": false}, {"data": [[1.0, 115.10000000000001]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/my-nominations/?offset=0&limit=10", "isController": false}, {"data": [[1.0, 115.10000000000001]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/my-nominations/?offset=0&limit=10-Aggregated", "isController": false}, {"data": [[1.0, 80.69999999999999]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports", "isController": false}, {"data": [[1.0, 80.69999999999999]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports-Aggregated", "isController": false}, {"data": [[1.0, 115.39999999999999]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/settings/", "isController": false}, {"data": [[1.0, 115.39999999999999]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/settings/-Aggregated", "isController": false}, {"data": [[1.0, 55.7]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competency_types", "isController": false}, {"data": [[1.0, 55.7]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competency_types-Aggregated", "isController": false}, {"data": [[1.0, 86.5]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9&offset=9", "isController": false}, {"data": [[1.0, 86.5]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9&offset=9-Aggregated", "isController": false}, {"data": [[1.0, 127.15]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports?is_system_report=true", "isController": false}, {"data": [[1.0, 127.15]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports?is_system_report=true-Aggregated", "isController": false}, {"data": [[1.0, 112.9]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/department/", "isController": false}, {"data": [[1.0, 112.9]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/department/-Aggregated", "isController": false}, {"data": [[1.0, 115.30000000000001]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_resource/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.0, 115.30000000000001]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_resource/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-Aggregated", "isController": false}, {"data": [[1.0, 16852.1]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.0, 16852.1]], "isOverall": false, "label": "Test-Aggregated", "isController": true}, {"data": [[1.0, 53.800000000000004]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_classification_categories", "isController": false}, {"data": [[1.0, 53.800000000000004]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_classification_categories-Aggregated", "isController": false}, {"data": [[1.0, 44.22857142857141]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/stats/", "isController": false}, {"data": [[1.0, 44.22857142857141]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/stats/-Aggregated", "isController": false}, {"data": [[1.0, 128.90000000000003]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/code_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.0, 128.90000000000003]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/code_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-Aggregated", "isController": false}, {"data": [[1.0, 128.9]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D&basic=true", "isController": false}, {"data": [[1.0, 128.9]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D&basic=true-Aggregated", "isController": false}, {"data": [[1.0, 107.1]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/display_settings/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.0, 107.1]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/display_settings/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-Aggregated", "isController": false}, {"data": [[1.0, 91.4]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/values/", "isController": false}, {"data": [[1.0, 91.4]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/values/-Aggregated", "isController": false}, {"data": [[1.0, 109.3]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/experience/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380", "isController": false}, {"data": [[1.0, 109.3]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/experience/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380-Aggregated", "isController": false}, {"data": [[1.0, 163.6]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/", "isController": false}, {"data": [[1.0, 163.6]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/-Aggregated", "isController": false}, {"data": [[1.0, 117.5]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/darwinbox/", "isController": false}, {"data": [[1.0, 117.5]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/darwinbox/-Aggregated", "isController": false}, {"data": [[1.0, 94.20000000000002]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reports", "isController": false}, {"data": [[1.0, 94.20000000000002]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reports-Aggregated", "isController": false}, {"data": [[1.0, 189.6]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_template_for_org", "isController": false}, {"data": [[1.0, 189.6]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_template_for_org-Aggregated", "isController": false}, {"data": [[1.0, 110.8]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/?with=", "isController": false}, {"data": [[1.0, 110.8]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/?with=-Aggregated", "isController": false}, {"data": [[1.0, 123.7]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/skills/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380", "isController": false}, {"data": [[1.0, 123.7]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/skills/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380-Aggregated", "isController": false}, {"data": [[1.0, 236.8]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/aspiration_settings/", "isController": false}, {"data": [[1.0, 236.8]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/aspiration_settings/-Aggregated", "isController": false}, {"data": [[1.0, 97.10000000000001]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=action_item", "isController": false}, {"data": [[1.0, 97.10000000000001]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=action_item-Aggregated", "isController": false}, {"data": [[1.0, 504.80000000000007]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/department/details/", "isController": false}, {"data": [[1.0, 504.80000000000007]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/department/details/-Aggregated", "isController": false}, {"data": [[1.0, 65.5]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_from_groups_ids/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", "isController": false}, {"data": [[1.0, 65.5]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_from_groups_ids/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups-Aggregated", "isController": false}, {"data": [[1.0, 316.4]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/my_objectives/?time_period_id=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=5&sort_by_key=created_at&sort_by_value=DESC", "isController": false}, {"data": [[1.0, 316.4]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/my_objectives/?time_period_id=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=5&sort_by_key=created_at&sort_by_value=DESC-Aggregated", "isController": false}, {"data": [[1.0, 124.1]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/jira_config/", "isController": false}, {"data": [[1.0, 124.1]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/jira_config/-Aggregated", "isController": false}, {"data": [[1.0, 120.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/compensation_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea&limit=10&offset=0", "isController": false}, {"data": [[1.0, 120.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/compensation_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea&limit=10&offset=0-Aggregated", "isController": false}, {"data": [[1.0, 3488.7999999999997]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/dashboard/?weightage_enabled=true", "isController": false}, {"data": [[1.0, 3488.7999999999997]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/dashboard/?weightage_enabled=true-Aggregated", "isController": false}, {"data": [[1.0, 137.1]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/nylas", "isController": false}, {"data": [[1.0, 137.1]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/nylas-Aggregated", "isController": false}, {"data": [[1.0, 130.70000000000002]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_users/user/?org_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&dr_count=false", "isController": false}, {"data": [[1.0, 130.70000000000002]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_users/user/?org_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&dr_count=false-Aggregated", "isController": false}, {"data": [[1.0, 45.9]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=9", "isController": false}, {"data": [[1.0, 45.9]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=9-Aggregated", "isController": false}, {"data": [[1.0, 134.13333333333333]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/my-org/", "isController": false}, {"data": [[1.0, 134.13333333333333]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/my-org/-Aggregated", "isController": false}, {"data": [[1.0, 84.66666666666666]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_ratings_for_org", "isController": false}, {"data": [[1.0, 84.66666666666666]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_ratings_for_org-Aggregated", "isController": false}, {"data": [[1.0, 121.7]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-config/", "isController": false}, {"data": [[1.0, 121.7]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-config/-Aggregated", "isController": false}, {"data": [[1.0, 109.60000000000001]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/document/settings/", "isController": false}, {"data": [[1.0, 109.60000000000001]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/document/settings/-Aggregated", "isController": false}, {"data": [[1.0, 506.20000000000005]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/feedback-nomination/?created_by=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&offset=0&limit=10", "isController": false}, {"data": [[1.0, 506.20000000000005]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/feedback-nomination/?created_by=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&offset=0&limit=10-Aggregated", "isController": false}, {"data": [[1.0, 459.40000000000003]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=10", "isController": false}, {"data": [[1.0, 459.40000000000003]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=10-Aggregated", "isController": false}, {"data": [[1.0, 51.91538461538462]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_settings_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.0, 51.91538461538462]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_settings_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-Aggregated", "isController": false}, {"data": [[1.0, 200.4]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/org/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.0, 200.4]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/org/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-Aggregated", "isController": false}, {"data": [[1.0, 106.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/bulk_import/?page=1&page_size=10", "isController": false}, {"data": [[1.0, 106.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/bulk_import/?page=1&page_size=10-Aggregated", "isController": false}, {"data": [[1.0, 134.10000000000002]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D", "isController": false}, {"data": [[1.0, 134.10000000000002]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D-Aggregated", "isController": false}, {"data": [[1.0, 63.5]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies?type=undefined", "isController": false}, {"data": [[1.0, 63.5]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies?type=undefined-Aggregated", "isController": false}, {"data": [[1.0, 111.36666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea/skills/", "isController": false}, {"data": [[1.0, 111.36666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea/skills/-Aggregated", "isController": false}, {"data": [[1.0, 42.5]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/programs/?search=&offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[1.0, 42.5]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/programs/?search=&offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697-Aggregated", "isController": false}, {"data": [[1.0, 79.0]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_pas_keys", "isController": false}, {"data": [[1.0, 79.0]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_pas_keys-Aggregated", "isController": false}, {"data": [[1.0, 165.10000000000002]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/opertaions/", "isController": false}, {"data": [[1.0, 165.10000000000002]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/opertaions/-Aggregated", "isController": false}, {"data": [[1.0, 573.0999999999999]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/4d4720e5-9027-4a32-b683-a3ef965009fe/?with=pending_requests%2Cprograms_connected%2Cconnection_availability", "isController": false}, {"data": [[1.0, 573.0999999999999]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/4d4720e5-9027-4a32-b683-a3ef965009fe/?with=pending_requests%2Cprograms_connected%2Cconnection_availability-Aggregated", "isController": false}, {"data": [[1.0, 60.7]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies_for_user?type_id=undefined&for_rate_tab=false&ou_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[1.0, 60.7]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies_for_user?type_id=undefined&for_rate_tab=false&ou_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697-Aggregated", "isController": false}, {"data": [[1.0, 112.6]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/pending_surveys/?user=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[1.0, 112.6]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/pending_surveys/?user=f21dc60a-55d2-43ac-8ad7-2a1aa6362697-Aggregated", "isController": false}, {"data": [[1.0, 155.50000000000003]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/eou/", "isController": false}, {"data": [[1.0, 155.50000000000003]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/eou/-Aggregated", "isController": false}, {"data": [[1.0, 99.6]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_all_system_reports", "isController": false}, {"data": [[1.0, 99.6]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_all_system_reports-Aggregated", "isController": false}, {"data": [[1.0, 146.2]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/?page=1&page_size=10&search=&get_disabled=true&filter=%5B%5D", "isController": false}, {"data": [[1.0, 146.2]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/?page=1&page_size=10&search=&get_disabled=true&filter=%5B%5D-Aggregated", "isController": false}, {"data": [[1.0, 131.65]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", "isController": false}, {"data": [[1.0, 131.65]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups-Aggregated", "isController": false}, {"data": [[1.0, 126.49999999999999]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22roles%22%2C%22__iregex%22%2C%22(%3F%3C!_)ADMIN%22%2C%22%22%5D%5D&page_size=10", "isController": false}, {"data": [[1.0, 126.49999999999999]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22roles%22%2C%22__iregex%22%2C%22(%3F%3C!_)ADMIN%22%2C%22%22%5D%5D&page_size=10-Aggregated", "isController": false}, {"data": [[1.0, 87.95]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_org", "isController": false}, {"data": [[1.0, 87.95]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_org-Aggregated", "isController": false}, {"data": [[1.0, 117.60000000000001]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-chart/", "isController": false}, {"data": [[1.0, 117.60000000000001]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-chart/-Aggregated", "isController": false}, {"data": [[1.0, 126.4]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/razorpay/", "isController": false}, {"data": [[1.0, 126.4]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/razorpay/-Aggregated", "isController": false}, {"data": [[1.0, 114.6]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/user_customfield/", "isController": false}, {"data": [[1.0, 114.6]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/user_customfield/-Aggregated", "isController": false}, {"data": [[1.0, 123.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/successfactor/", "isController": false}, {"data": [[1.0, 123.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/successfactor/-Aggregated", "isController": false}, {"data": [[1.0, 459.5]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=9007199254740991", "isController": false}, {"data": [[1.0, 459.5]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=9007199254740991-Aggregated", "isController": false}, {"data": [[1.0, 37.300000000000004]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=9&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=5", "isController": false}, {"data": [[1.0, 37.300000000000004]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=9&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=5-Aggregated", "isController": false}, {"data": [[1.0, 144.8]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=goal", "isController": false}, {"data": [[1.0, 144.8]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=goal-Aggregated", "isController": false}, {"data": [[1.0, 124.5]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&page_size=10", "isController": false}, {"data": [[1.0, 124.5]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&page_size=10-Aggregated", "isController": false}, {"data": [[1.0, 78.85]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_user", "isController": false}, {"data": [[1.0, 78.85]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_user-Aggregated", "isController": false}, {"data": [[1.0, 134.09999999999997]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?time_period_ids=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=10", "isController": false}, {"data": [[1.0, 134.09999999999997]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?time_period_ids=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=10-Aggregated", "isController": false}, {"data": [[1.0, 128.39999999999998]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/shortcuts/?mode=all", "isController": false}, {"data": [[1.0, 128.39999999999998]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/shortcuts/?mode=all-Aggregated", "isController": false}, {"data": [[1.0, 178.3]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/", "isController": false}, {"data": [[1.0, 178.3]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 1.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 218.25, "minX": 1.71007464E12, "maxY": 43551.85, "series": [{"data": [[1.7100747E12, 43551.85], [1.71007482E12, 33243.13333333333], [1.71007464E12, 1330.2833333333333], [1.71007476E12, 40384.3]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.7100747E12, 3763.85], [1.71007482E12, 2862.5833333333335], [1.71007464E12, 218.25], [1.71007476E12, 3624.983333333333]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.71007482E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 36.0, "minX": 1.71007464E12, "maxY": 17633.0, "series": [{"data": [[1.7100747E12, 113.5], [1.71007482E12, 108.66666666666667], [1.71007476E12, 107.33333333333333]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/surveys/?name=&organization=false&page=1", "isController": false}, {"data": [[1.7100747E12, 99.5], [1.71007482E12, 94.0], [1.71007476E12, 94.5]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9", "isController": false}, {"data": [[1.7100747E12, 127.25], [1.71007482E12, 124.0], [1.71007476E12, 148.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22manager%22%2C%22__isnull%22%2C%22true%22%2C%22%22%5D%5D&page_size=10", "isController": false}, {"data": [[1.7100747E12, 123.0], [1.71007482E12, 106.33333333333333], [1.71007476E12, 113.33333333333333]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/my-nominations/?offset=0&limit=10", "isController": false}, {"data": [[1.7100747E12, 87.25], [1.71007482E12, 75.66666666666667], [1.71007476E12, 77.0]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports", "isController": false}, {"data": [[1.7100747E12, 99.5], [1.71007482E12, 148.33333333333334], [1.71007476E12, 103.66666666666667]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/settings/", "isController": false}, {"data": [[1.7100747E12, 57.5], [1.71007482E12, 56.333333333333336], [1.71007476E12, 52.66666666666667]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competency_types", "isController": false}, {"data": [[1.7100747E12, 86.75], [1.71007482E12, 90.5], [1.71007476E12, 84.25]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9&offset=9", "isController": false}, {"data": [[1.7100747E12, 124.24999999999999], [1.71007482E12, 126.83333333333333], [1.71007476E12, 131.33333333333334]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports?is_system_report=true", "isController": false}, {"data": [[1.7100747E12, 114.33333333333333], [1.71007482E12, 117.0], [1.71007464E12, 109.0], [1.71007476E12, 110.75]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/department/", "isController": false}, {"data": [[1.7100747E12, 108.75], [1.71007482E12, 118.0], [1.71007476E12, 121.33333333333333]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_resource/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.7100747E12, 17633.0], [1.71007482E12, 16347.666666666666], [1.71007476E12, 16644.75]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.7100747E12, 53.0], [1.71007482E12, 58.0], [1.71007476E12, 50.666666666666664]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_classification_categories", "isController": false}, {"data": [[1.7100747E12, 51.909090909090914], [1.71007482E12, 36.3125], [1.71007464E12, 52.5], [1.71007476E12, 41.535714285714285]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/stats/", "isController": false}, {"data": [[1.7100747E12, 139.25], [1.71007482E12, 121.0], [1.71007476E12, 123.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/code_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.7100747E12, 131.33333333333334], [1.71007482E12, 133.0], [1.71007464E12, 120.0], [1.71007476E12, 127.25]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D&basic=true", "isController": false}, {"data": [[1.7100747E12, 109.33333333333333], [1.71007482E12, 107.33333333333333], [1.71007476E12, 105.25]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/display_settings/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.7100747E12, 90.33333333333333], [1.71007482E12, 90.0], [1.71007464E12, 87.0], [1.71007476E12, 94.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/values/", "isController": false}, {"data": [[1.7100747E12, 107.66666666666667], [1.71007482E12, 110.0], [1.71007464E12, 108.0], [1.71007476E12, 110.5]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/experience/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380", "isController": false}, {"data": [[1.7100747E12, 185.0], [1.71007482E12, 151.33333333333334], [1.71007476E12, 156.75]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/", "isController": false}, {"data": [[1.7100747E12, 137.66666666666666], [1.71007482E12, 110.33333333333333], [1.71007476E12, 107.75]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/darwinbox/", "isController": false}, {"data": [[1.7100747E12, 98.3125], [1.71007482E12, 90.0], [1.71007476E12, 92.91666666666667]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reports", "isController": false}, {"data": [[1.7100747E12, 175.25], [1.71007482E12, 290.0], [1.71007476E12, 153.75]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_template_for_org", "isController": false}, {"data": [[1.7100747E12, 111.0], [1.71007482E12, 108.33333333333333], [1.71007476E12, 112.5]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/?with=", "isController": false}, {"data": [[1.7100747E12, 124.33333333333333], [1.71007482E12, 117.5], [1.71007464E12, 104.0], [1.71007476E12, 131.25]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/skills/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380", "isController": false}, {"data": [[1.7100747E12, 130.25], [1.71007482E12, 134.0], [1.71007476E12, 481.66666666666663]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/aspiration_settings/", "isController": false}, {"data": [[1.7100747E12, 96.0], [1.71007482E12, 106.33333333333333], [1.71007476E12, 89.33333333333333]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=action_item", "isController": false}, {"data": [[1.7100747E12, 514.0], [1.71007482E12, 510.0], [1.71007476E12, 487.3333333333333]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/department/details/", "isController": false}, {"data": [[1.7100747E12, 78.75], [1.71007482E12, 56.666666666666664], [1.71007476E12, 56.666666666666664]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_from_groups_ids/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", "isController": false}, {"data": [[1.7100747E12, 308.0], [1.71007482E12, 295.5], [1.71007464E12, 361.0], [1.71007476E12, 322.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/my_objectives/?time_period_id=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=5&sort_by_key=created_at&sort_by_value=DESC", "isController": false}, {"data": [[1.7100747E12, 99.33333333333333], [1.71007482E12, 140.33333333333334], [1.71007476E12, 130.5]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/jira_config/", "isController": false}, {"data": [[1.7100747E12, 122.5], [1.71007482E12, 118.33333333333333], [1.71007476E12, 118.33333333333333]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/compensation_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea&limit=10&offset=0", "isController": false}, {"data": [[1.7100747E12, 3762.0], [1.71007482E12, 3392.5], [1.71007464E12, 3190.0], [1.71007476E12, 3406.75]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/dashboard/?weightage_enabled=true", "isController": false}, {"data": [[1.7100747E12, 132.0], [1.71007482E12, 123.0], [1.71007464E12, 113.0], [1.71007476E12, 154.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/nylas", "isController": false}, {"data": [[1.7100747E12, 133.0], [1.71007482E12, 126.0], [1.71007476E12, 130.75]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_users/user/?org_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&dr_count=false", "isController": false}, {"data": [[1.7100747E12, 66.66666666666667], [1.71007482E12, 38.0], [1.71007464E12, 37.0], [1.71007476E12, 36.5]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=9", "isController": false}, {"data": [[1.7100747E12, 132.08333333333331], [1.71007482E12, 132.77777777777777], [1.71007476E12, 138.22222222222223]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/my-org/", "isController": false}, {"data": [[1.7100747E12, 82.83333333333334], [1.71007482E12, 87.88888888888889], [1.71007476E12, 83.88888888888889]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_ratings_for_org", "isController": false}, {"data": [[1.7100747E12, 119.33333333333333], [1.71007482E12, 118.0], [1.71007476E12, 126.25]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-config/", "isController": false}, {"data": [[1.7100747E12, 105.5], [1.71007482E12, 115.0], [1.71007476E12, 109.66666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/document/settings/", "isController": false}, {"data": [[1.7100747E12, 480.75], [1.71007482E12, 506.3333333333333], [1.71007476E12, 540.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/feedback-nomination/?created_by=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&offset=0&limit=10", "isController": false}, {"data": [[1.7100747E12, 453.0], [1.71007482E12, 464.0], [1.71007464E12, 459.5], [1.71007476E12, 461.87499999999994]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=10", "isController": false}, {"data": [[1.7100747E12, 50.43478260869566], [1.71007482E12, 53.0], [1.71007476E12, 52.48888888888889]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_settings_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.7100747E12, 199.0], [1.71007482E12, 209.33333333333334], [1.71007476E12, 193.33333333333334]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/org/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.7100747E12, 101.0], [1.71007482E12, 93.0], [1.71007464E12, 110.0], [1.71007476E12, 115.25]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/bulk_import/?page=1&page_size=10", "isController": false}, {"data": [[1.7100747E12, 142.0], [1.71007482E12, 130.0], [1.71007476E12, 127.66666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D", "isController": false}, {"data": [[1.7100747E12, 71.75], [1.71007482E12, 58.666666666666664], [1.71007476E12, 57.333333333333336]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies?type=undefined", "isController": false}, {"data": [[1.7100747E12, 114.18181818181819], [1.71007482E12, 112.12500000000001], [1.71007464E12, 111.0], [1.71007476E12, 107.70000000000002]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea/skills/", "isController": false}, {"data": [[1.7100747E12, 44.25], [1.71007482E12, 43.0], [1.71007476E12, 40.5]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/programs/?search=&offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[1.7100747E12, 79.0], [1.71007482E12, 60.666666666666664], [1.71007476E12, 92.75]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_pas_keys", "isController": false}, {"data": [[1.7100747E12, 276.2], [1.71007482E12, 106.57142857142857], [1.71007464E12, 147.0], [1.71007476E12, 104.63636363636364]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/opertaions/", "isController": false}, {"data": [[1.7100747E12, 554.3333333333334], [1.71007482E12, 604.5], [1.71007464E12, 554.0], [1.71007476E12, 576.25]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/4d4720e5-9027-4a32-b683-a3ef965009fe/?with=pending_requests%2Cprograms_connected%2Cconnection_availability", "isController": false}, {"data": [[1.7100747E12, 56.5], [1.71007482E12, 56.333333333333336], [1.71007476E12, 70.66666666666667]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies_for_user?type_id=undefined&for_rate_tab=false&ou_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[1.7100747E12, 110.5], [1.71007482E12, 114.33333333333333], [1.71007476E12, 113.66666666666667]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/pending_surveys/?user=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[1.7100747E12, 145.66666666666666], [1.71007482E12, 146.66666666666666], [1.71007476E12, 169.5]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/eou/", "isController": false}, {"data": [[1.7100747E12, 105.5], [1.71007482E12, 112.0], [1.71007476E12, 79.33333333333333]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_all_system_reports", "isController": false}, {"data": [[1.7100747E12, 146.5], [1.71007482E12, 148.0], [1.71007476E12, 144.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/?page=1&page_size=10&search=&get_disabled=true&filter=%5B%5D", "isController": false}, {"data": [[1.7100747E12, 155.0], [1.71007482E12, 124.5], [1.71007476E12, 114.42857142857143]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", "isController": false}, {"data": [[1.7100747E12, 124.14285714285714], [1.71007482E12, 135.0], [1.71007476E12, 121.57142857142857]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22roles%22%2C%22__iregex%22%2C%22(%3F%3C!_)ADMIN%22%2C%22%22%5D%5D&page_size=10", "isController": false}, {"data": [[1.7100747E12, 99.875], [1.71007482E12, 85.5], [1.71007476E12, 74.5]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_org", "isController": false}, {"data": [[1.7100747E12, 139.75], [1.71007482E12, 107.0], [1.71007476E12, 98.66666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-chart/", "isController": false}, {"data": [[1.7100747E12, 138.66666666666666], [1.71007482E12, 120.0], [1.71007476E12, 122.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/razorpay/", "isController": false}, {"data": [[1.7100747E12, 114.71428571428572], [1.71007482E12, 115.16666666666667], [1.71007476E12, 114.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/user_customfield/", "isController": false}, {"data": [[1.7100747E12, 127.0], [1.71007482E12, 118.66666666666667], [1.71007476E12, 123.25]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/successfactor/", "isController": false}, {"data": [[1.7100747E12, 472.3333333333333], [1.71007482E12, 453.0], [1.71007464E12, 465.0], [1.71007476E12, 451.75]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=9007199254740991", "isController": false}, {"data": [[1.7100747E12, 38.0], [1.71007482E12, 36.0], [1.71007464E12, 37.0], [1.71007476E12, 37.5]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=9&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=5", "isController": false}, {"data": [[1.7100747E12, 135.0], [1.71007482E12, 162.33333333333334], [1.71007476E12, 140.33333333333334]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=goal", "isController": false}, {"data": [[1.7100747E12, 122.0], [1.71007482E12, 127.0], [1.71007476E12, 125.33333333333333]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&page_size=10", "isController": false}, {"data": [[1.7100747E12, 80.625], [1.71007482E12, 74.83333333333333], [1.71007476E12, 80.5]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_user", "isController": false}, {"data": [[1.7100747E12, 101.33333333333333], [1.71007482E12, 94.0], [1.71007464E12, 402.0], [1.71007476E12, 111.75]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?time_period_ids=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=10", "isController": false}, {"data": [[1.7100747E12, 132.5], [1.71007482E12, 132.0], [1.71007476E12, 119.33333333333333]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/shortcuts/?mode=all", "isController": false}, {"data": [[1.7100747E12, 193.33333333333334], [1.71007482E12, 168.66666666666666], [1.71007476E12, 174.25]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.71007482E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 34.0, "minX": 1.71007464E12, "maxY": 17347.0, "series": [{"data": [[1.7100747E12, 112.0], [1.71007482E12, 107.33333333333333], [1.71007476E12, 104.66666666666667]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/surveys/?name=&organization=false&page=1", "isController": false}, {"data": [[1.7100747E12, 99.5], [1.71007482E12, 94.0], [1.71007476E12, 94.5]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9", "isController": false}, {"data": [[1.7100747E12, 127.0], [1.71007482E12, 123.0], [1.71007476E12, 147.66666666666666]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22manager%22%2C%22__isnull%22%2C%22true%22%2C%22%22%5D%5D&page_size=10", "isController": false}, {"data": [[1.7100747E12, 122.75], [1.71007482E12, 106.33333333333333], [1.71007476E12, 113.33333333333333]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/my-nominations/?offset=0&limit=10", "isController": false}, {"data": [[1.7100747E12, 87.25], [1.71007482E12, 75.66666666666667], [1.71007476E12, 77.0]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports", "isController": false}, {"data": [[1.7100747E12, 99.5], [1.71007482E12, 148.33333333333334], [1.71007476E12, 103.66666666666667]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/settings/", "isController": false}, {"data": [[1.7100747E12, 57.5], [1.71007482E12, 56.333333333333336], [1.71007476E12, 52.66666666666667]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competency_types", "isController": false}, {"data": [[1.7100747E12, 86.75], [1.71007482E12, 90.5], [1.71007476E12, 84.25]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9&offset=9", "isController": false}, {"data": [[1.7100747E12, 124.24999999999999], [1.71007482E12, 126.83333333333333], [1.71007476E12, 131.16666666666666]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports?is_system_report=true", "isController": false}, {"data": [[1.7100747E12, 114.0], [1.71007482E12, 117.0], [1.71007464E12, 109.0], [1.71007476E12, 110.75]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/department/", "isController": false}, {"data": [[1.7100747E12, 108.5], [1.71007482E12, 118.0], [1.71007476E12, 121.33333333333333]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_resource/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.7100747E12, 17347.0], [1.71007482E12, 16049.666666666666], [1.71007476E12, 16348.75]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.7100747E12, 53.0], [1.71007482E12, 58.0], [1.71007476E12, 50.666666666666664]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_classification_categories", "isController": false}, {"data": [[1.7100747E12, 51.909090909090914], [1.71007482E12, 36.3125], [1.71007464E12, 52.5], [1.71007476E12, 41.535714285714285]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/stats/", "isController": false}, {"data": [[1.7100747E12, 139.0], [1.71007482E12, 121.0], [1.71007476E12, 123.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/code_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.7100747E12, 125.33333333333333], [1.71007482E12, 126.5], [1.71007464E12, 110.0], [1.71007476E12, 120.5]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D&basic=true", "isController": false}, {"data": [[1.7100747E12, 109.33333333333333], [1.71007482E12, 107.33333333333333], [1.71007476E12, 105.25]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/display_settings/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.7100747E12, 90.33333333333333], [1.71007482E12, 90.0], [1.71007464E12, 87.0], [1.71007476E12, 94.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/values/", "isController": false}, {"data": [[1.7100747E12, 107.66666666666667], [1.71007482E12, 110.0], [1.71007464E12, 108.0], [1.71007476E12, 110.5]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/experience/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380", "isController": false}, {"data": [[1.7100747E12, 185.0], [1.71007482E12, 151.33333333333334], [1.71007476E12, 156.75]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/", "isController": false}, {"data": [[1.7100747E12, 137.66666666666666], [1.71007482E12, 110.33333333333333], [1.71007476E12, 107.75]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/darwinbox/", "isController": false}, {"data": [[1.7100747E12, 98.3125], [1.71007482E12, 90.0], [1.71007476E12, 92.91666666666667]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reports", "isController": false}, {"data": [[1.7100747E12, 156.25], [1.71007482E12, 258.5], [1.71007476E12, 131.25]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_template_for_org", "isController": false}, {"data": [[1.7100747E12, 111.0], [1.71007482E12, 108.33333333333333], [1.71007476E12, 112.5]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/?with=", "isController": false}, {"data": [[1.7100747E12, 124.33333333333333], [1.71007482E12, 117.5], [1.71007464E12, 104.0], [1.71007476E12, 131.25]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/skills/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380", "isController": false}, {"data": [[1.7100747E12, 123.75], [1.71007482E12, 126.66666666666667], [1.71007476E12, 464.66666666666663]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/aspiration_settings/", "isController": false}, {"data": [[1.7100747E12, 96.0], [1.71007482E12, 106.33333333333333], [1.71007476E12, 89.33333333333333]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=action_item", "isController": false}, {"data": [[1.7100747E12, 497.25], [1.71007482E12, 495.6666666666667], [1.71007476E12, 475.3333333333333]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/department/details/", "isController": false}, {"data": [[1.7100747E12, 78.5], [1.71007482E12, 56.666666666666664], [1.71007476E12, 56.666666666666664]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_from_groups_ids/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", "isController": false}, {"data": [[1.7100747E12, 298.6666666666667], [1.71007482E12, 287.0], [1.71007464E12, 353.0], [1.71007476E12, 312.75]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/my_objectives/?time_period_id=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=5&sort_by_key=created_at&sort_by_value=DESC", "isController": false}, {"data": [[1.7100747E12, 99.0], [1.71007482E12, 140.33333333333334], [1.71007476E12, 130.5]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/jira_config/", "isController": false}, {"data": [[1.7100747E12, 122.0], [1.71007482E12, 118.33333333333333], [1.71007476E12, 118.33333333333333]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/compensation_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea&limit=10&offset=0", "isController": false}, {"data": [[1.7100747E12, 3761.0], [1.71007482E12, 3391.5], [1.71007464E12, 3188.0], [1.71007476E12, 3405.5]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/dashboard/?weightage_enabled=true", "isController": false}, {"data": [[1.7100747E12, 131.66666666666666], [1.71007482E12, 123.0], [1.71007464E12, 113.0], [1.71007476E12, 154.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/nylas", "isController": false}, {"data": [[1.7100747E12, 133.0], [1.71007482E12, 126.0], [1.71007476E12, 129.75]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_users/user/?org_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&dr_count=false", "isController": false}, {"data": [[1.7100747E12, 66.0], [1.71007482E12, 37.0], [1.71007464E12, 37.0], [1.71007476E12, 35.75]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=9", "isController": false}, {"data": [[1.7100747E12, 131.33333333333334], [1.71007482E12, 130.77777777777777], [1.71007476E12, 137.66666666666669]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/my-org/", "isController": false}, {"data": [[1.7100747E12, 82.83333333333334], [1.71007482E12, 87.88888888888889], [1.71007476E12, 83.88888888888889]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_ratings_for_org", "isController": false}, {"data": [[1.7100747E12, 119.33333333333333], [1.71007482E12, 117.66666666666667], [1.71007476E12, 126.25]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-config/", "isController": false}, {"data": [[1.7100747E12, 105.5], [1.71007482E12, 115.0], [1.71007476E12, 109.66666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/document/settings/", "isController": false}, {"data": [[1.7100747E12, 480.5], [1.71007482E12, 506.3333333333333], [1.71007476E12, 540.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/feedback-nomination/?created_by=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&offset=0&limit=10", "isController": false}, {"data": [[1.7100747E12, 450.1666666666667], [1.71007482E12, 461.75], [1.71007464E12, 457.5], [1.71007476E12, 458.75]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=10", "isController": false}, {"data": [[1.7100747E12, 40.91304347826085], [1.71007482E12, 42.94871794871795], [1.71007476E12, 42.55555555555555]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_settings_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.7100747E12, 175.75], [1.71007482E12, 182.0], [1.71007476E12, 161.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/org/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.7100747E12, 101.0], [1.71007482E12, 93.0], [1.71007464E12, 110.0], [1.71007476E12, 115.25]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/bulk_import/?page=1&page_size=10", "isController": false}, {"data": [[1.7100747E12, 134.25], [1.71007482E12, 122.33333333333333], [1.71007476E12, 121.33333333333333]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D", "isController": false}, {"data": [[1.7100747E12, 71.75], [1.71007482E12, 58.666666666666664], [1.71007476E12, 57.333333333333336]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies?type=undefined", "isController": false}, {"data": [[1.7100747E12, 114.0909090909091], [1.71007482E12, 112.00000000000001], [1.71007464E12, 111.0], [1.71007476E12, 107.49999999999999]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea/skills/", "isController": false}, {"data": [[1.7100747E12, 38.0], [1.71007482E12, 36.0], [1.71007476E12, 34.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/programs/?search=&offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[1.7100747E12, 79.0], [1.71007482E12, 60.666666666666664], [1.71007476E12, 92.75]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_pas_keys", "isController": false}, {"data": [[1.7100747E12, 276.2], [1.71007482E12, 106.57142857142857], [1.71007464E12, 147.0], [1.71007476E12, 103.81818181818181]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/opertaions/", "isController": false}, {"data": [[1.7100747E12, 554.0], [1.71007482E12, 604.5], [1.71007464E12, 554.0], [1.71007476E12, 575.75]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/4d4720e5-9027-4a32-b683-a3ef965009fe/?with=pending_requests%2Cprograms_connected%2Cconnection_availability", "isController": false}, {"data": [[1.7100747E12, 56.5], [1.71007482E12, 56.333333333333336], [1.71007476E12, 70.66666666666667]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies_for_user?type_id=undefined&for_rate_tab=false&ou_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[1.7100747E12, 110.5], [1.71007482E12, 114.33333333333333], [1.71007476E12, 113.66666666666667]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/pending_surveys/?user=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[1.7100747E12, 145.66666666666666], [1.71007482E12, 146.66666666666666], [1.71007476E12, 169.5]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/eou/", "isController": false}, {"data": [[1.7100747E12, 105.5], [1.71007482E12, 112.0], [1.71007476E12, 79.33333333333333]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_all_system_reports", "isController": false}, {"data": [[1.7100747E12, 135.25], [1.71007482E12, 139.33333333333334], [1.71007476E12, 134.33333333333334]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/?page=1&page_size=10&search=&get_disabled=true&filter=%5B%5D", "isController": false}, {"data": [[1.7100747E12, 141.42857142857142], [1.71007482E12, 111.16666666666667], [1.71007476E12, 101.57142857142857]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", "isController": false}, {"data": [[1.7100747E12, 124.00000000000001], [1.71007482E12, 135.0], [1.71007476E12, 121.42857142857143]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22roles%22%2C%22__iregex%22%2C%22(%3F%3C!_)ADMIN%22%2C%22%22%5D%5D&page_size=10", "isController": false}, {"data": [[1.7100747E12, 98.0], [1.71007482E12, 83.66666666666667], [1.71007476E12, 73.16666666666667]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_org", "isController": false}, {"data": [[1.7100747E12, 139.75], [1.71007482E12, 107.0], [1.71007476E12, 98.66666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-chart/", "isController": false}, {"data": [[1.7100747E12, 138.66666666666666], [1.71007482E12, 120.0], [1.71007476E12, 122.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/razorpay/", "isController": false}, {"data": [[1.7100747E12, 114.71428571428572], [1.71007482E12, 115.0], [1.71007476E12, 113.85714285714286]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/user_customfield/", "isController": false}, {"data": [[1.7100747E12, 126.66666666666667], [1.71007482E12, 118.66666666666667], [1.71007476E12, 123.25]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/successfactor/", "isController": false}, {"data": [[1.7100747E12, 469.6666666666667], [1.71007482E12, 445.5], [1.71007464E12, 461.0], [1.71007476E12, 448.25]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=9007199254740991", "isController": false}, {"data": [[1.7100747E12, 38.0], [1.71007482E12, 36.0], [1.71007464E12, 37.0], [1.71007476E12, 37.5]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=9&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=5", "isController": false}, {"data": [[1.7100747E12, 135.0], [1.71007482E12, 162.33333333333334], [1.71007476E12, 140.33333333333334]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=goal", "isController": false}, {"data": [[1.7100747E12, 121.75], [1.71007482E12, 127.0], [1.71007476E12, 125.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&page_size=10", "isController": false}, {"data": [[1.7100747E12, 80.625], [1.71007482E12, 74.83333333333333], [1.71007476E12, 80.5]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_user", "isController": false}, {"data": [[1.7100747E12, 101.33333333333333], [1.71007482E12, 94.0], [1.71007464E12, 399.0], [1.71007476E12, 111.75]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?time_period_ids=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=10", "isController": false}, {"data": [[1.7100747E12, 132.5], [1.71007482E12, 132.0], [1.71007476E12, 119.33333333333333]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/shortcuts/?mode=all", "isController": false}, {"data": [[1.7100747E12, 192.66666666666666], [1.71007482E12, 168.0], [1.71007476E12, 173.75]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.71007482E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.71007464E12, "maxY": 407.66666666666663, "series": [{"data": [[1.7100747E12, 0.0], [1.71007482E12, 0.0], [1.71007476E12, 0.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/surveys/?name=&organization=false&page=1", "isController": false}, {"data": [[1.7100747E12, 0.0], [1.71007482E12, 0.0], [1.71007476E12, 0.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9", "isController": false}, {"data": [[1.7100747E12, 0.0], [1.71007482E12, 0.0], [1.71007476E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22manager%22%2C%22__isnull%22%2C%22true%22%2C%22%22%5D%5D&page_size=10", "isController": false}, {"data": [[1.7100747E12, 0.0], [1.71007482E12, 0.0], [1.71007476E12, 0.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/my-nominations/?offset=0&limit=10", "isController": false}, {"data": [[1.7100747E12, 0.0], [1.71007482E12, 0.0], [1.71007476E12, 0.0]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports", "isController": false}, {"data": [[1.7100747E12, 0.0], [1.71007482E12, 44.66666666666667], [1.71007476E12, 0.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/settings/", "isController": false}, {"data": [[1.7100747E12, 0.0], [1.71007482E12, 0.0], [1.71007476E12, 0.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competency_types", "isController": false}, {"data": [[1.7100747E12, 0.0], [1.71007482E12, 0.0], [1.71007476E12, 0.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9&offset=9", "isController": false}, {"data": [[1.7100747E12, 0.0], [1.71007482E12, 0.0], [1.71007476E12, 0.0]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports?is_system_report=true", "isController": false}, {"data": [[1.7100747E12, 0.0], [1.71007482E12, 0.0], [1.71007464E12, 0.0], [1.71007476E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/department/", "isController": false}, {"data": [[1.7100747E12, 0.0], [1.71007482E12, 0.0], [1.71007476E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_resource/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.7100747E12, 361.66666666666663], [1.71007482E12, 407.66666666666663], [1.71007476E12, 325.75]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.7100747E12, 0.0], [1.71007482E12, 0.0], [1.71007476E12, 0.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_classification_categories", "isController": false}, {"data": [[1.7100747E12, 0.0], [1.71007482E12, 0.0], [1.71007464E12, 16.0], [1.71007476E12, 6.3571428571428585]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/stats/", "isController": false}, {"data": [[1.7100747E12, 0.0], [1.71007482E12, 0.0], [1.71007476E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/code_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.7100747E12, 0.0], [1.71007482E12, 0.0], [1.71007464E12, 0.0], [1.71007476E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D&basic=true", "isController": false}, {"data": [[1.7100747E12, 0.0], [1.71007482E12, 0.0], [1.71007476E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/display_settings/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.7100747E12, 0.0], [1.71007482E12, 0.0], [1.71007464E12, 0.0], [1.71007476E12, 0.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/values/", "isController": false}, {"data": [[1.7100747E12, 0.0], [1.71007482E12, 0.0], [1.71007464E12, 0.0], [1.71007476E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/experience/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380", "isController": false}, {"data": [[1.7100747E12, 0.0], [1.71007482E12, 0.0], [1.71007476E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/", "isController": false}, {"data": [[1.7100747E12, 0.0], [1.71007482E12, 0.0], [1.71007476E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/darwinbox/", "isController": false}, {"data": [[1.7100747E12, 0.0], [1.71007482E12, 0.0], [1.71007476E12, 0.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reports", "isController": false}, {"data": [[1.7100747E12, 18.75], [1.71007482E12, 92.0], [1.71007476E12, 34.0]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_template_for_org", "isController": false}, {"data": [[1.7100747E12, 0.0], [1.71007482E12, 0.0], [1.71007476E12, 0.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/?with=", "isController": false}, {"data": [[1.7100747E12, 0.0], [1.71007482E12, 0.0], [1.71007464E12, 0.0], [1.71007476E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/skills/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380", "isController": false}, {"data": [[1.7100747E12, 0.0], [1.71007482E12, 0.0], [1.71007476E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/aspiration_settings/", "isController": false}, {"data": [[1.7100747E12, 0.0], [1.71007482E12, 0.0], [1.71007476E12, 0.0]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=action_item", "isController": false}, {"data": [[1.7100747E12, 0.0], [1.71007482E12, 0.0], [1.71007476E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/department/details/", "isController": false}, {"data": [[1.7100747E12, 0.0], [1.71007482E12, 0.0], [1.71007476E12, 0.0]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_from_groups_ids/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", "isController": false}, {"data": [[1.7100747E12, 0.0], [1.71007482E12, 0.0], [1.71007464E12, 0.0], [1.71007476E12, 0.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/my_objectives/?time_period_id=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=5&sort_by_key=created_at&sort_by_value=DESC", "isController": false}, {"data": [[1.7100747E12, 0.0], [1.71007482E12, 43.66666666666667], [1.71007476E12, 36.25]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/jira_config/", "isController": false}, {"data": [[1.7100747E12, 0.0], [1.71007482E12, 0.0], [1.71007476E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/compensation_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea&limit=10&offset=0", "isController": false}, {"data": [[1.7100747E12, 0.0], [1.71007482E12, 0.0], [1.71007464E12, 0.0], [1.71007476E12, 0.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/dashboard/?weightage_enabled=true", "isController": false}, {"data": [[1.7100747E12, 0.0], [1.71007482E12, 0.0], [1.71007464E12, 0.0], [1.71007476E12, 33.5]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/nylas", "isController": false}, {"data": [[1.7100747E12, 0.0], [1.71007482E12, 0.0], [1.71007476E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_users/user/?org_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&dr_count=false", "isController": false}, {"data": [[1.7100747E12, 0.0], [1.71007482E12, 0.0], [1.71007464E12, 0.0], [1.71007476E12, 0.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=9", "isController": false}, {"data": [[1.7100747E12, 0.0], [1.71007482E12, 0.0], [1.71007476E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/my-org/", "isController": false}, {"data": [[1.7100747E12, 8.91666666666667], [1.71007482E12, 14.0], [1.71007476E12, 13.333333333333334]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_ratings_for_org", "isController": false}, {"data": [[1.7100747E12, 0.0], [1.71007482E12, 0.0], [1.71007476E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-config/", "isController": false}, {"data": [[1.7100747E12, 0.0], [1.71007482E12, 0.0], [1.71007476E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/document/settings/", "isController": false}, {"data": [[1.7100747E12, 20.5], [1.71007482E12, 40.0], [1.71007476E12, 59.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/feedback-nomination/?created_by=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&offset=0&limit=10", "isController": false}, {"data": [[1.7100747E12, 0.0], [1.71007482E12, 0.0], [1.71007464E12, 0.0], [1.71007476E12, 0.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=10", "isController": false}, {"data": [[1.7100747E12, 1.8913043478260851], [1.71007482E12, 3.051282051282051], [1.71007476E12, 2.977777777777778]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_settings_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.7100747E12, 0.0], [1.71007482E12, 0.0], [1.71007476E12, 0.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/org/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.7100747E12, 0.0], [1.71007482E12, 0.0], [1.71007464E12, 0.0], [1.71007476E12, 0.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/bulk_import/?page=1&page_size=10", "isController": false}, {"data": [[1.7100747E12, 0.0], [1.71007482E12, 0.0], [1.71007476E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D", "isController": false}, {"data": [[1.7100747E12, 0.0], [1.71007482E12, 0.0], [1.71007476E12, 0.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies?type=undefined", "isController": false}, {"data": [[1.7100747E12, 0.0], [1.71007482E12, 0.0], [1.71007464E12, 0.0], [1.71007476E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea/skills/", "isController": false}, {"data": [[1.7100747E12, 0.0], [1.71007482E12, 0.0], [1.71007476E12, 0.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/programs/?search=&offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[1.7100747E12, 0.0], [1.71007482E12, 0.0], [1.71007476E12, 0.0]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_pas_keys", "isController": false}, {"data": [[1.7100747E12, 0.0], [1.71007482E12, 0.0], [1.71007464E12, 42.0], [1.71007476E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/opertaions/", "isController": false}, {"data": [[1.7100747E12, 0.0], [1.71007482E12, 0.0], [1.71007464E12, 0.0], [1.71007476E12, 0.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/4d4720e5-9027-4a32-b683-a3ef965009fe/?with=pending_requests%2Cprograms_connected%2Cconnection_availability", "isController": false}, {"data": [[1.7100747E12, 0.0], [1.71007482E12, 0.0], [1.71007476E12, 0.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies_for_user?type_id=undefined&for_rate_tab=false&ou_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[1.7100747E12, 0.0], [1.71007482E12, 0.0], [1.71007476E12, 0.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/pending_surveys/?user=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[1.7100747E12, 0.0], [1.71007482E12, 0.0], [1.71007476E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/eou/", "isController": false}, {"data": [[1.7100747E12, 0.0], [1.71007482E12, 0.0], [1.71007476E12, 0.0]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_all_system_reports", "isController": false}, {"data": [[1.7100747E12, 0.0], [1.71007482E12, 0.0], [1.71007476E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/?page=1&page_size=10&search=&get_disabled=true&filter=%5B%5D", "isController": false}, {"data": [[1.7100747E12, 29.857142857142854], [1.71007482E12, 23.0], [1.71007476E12, 20.285714285714285]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", "isController": false}, {"data": [[1.7100747E12, 0.0], [1.71007482E12, 0.0], [1.71007476E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22roles%22%2C%22__iregex%22%2C%22(%3F%3C!_)ADMIN%22%2C%22%22%5D%5D&page_size=10", "isController": false}, {"data": [[1.7100747E12, 0.0], [1.71007482E12, 0.0], [1.71007476E12, 0.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_org", "isController": false}, {"data": [[1.7100747E12, 34.0], [1.71007482E12, 0.0], [1.71007476E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-chart/", "isController": false}, {"data": [[1.7100747E12, 0.0], [1.71007482E12, 0.0], [1.71007476E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/razorpay/", "isController": false}, {"data": [[1.7100747E12, 0.0], [1.71007482E12, 0.0], [1.71007476E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/user_customfield/", "isController": false}, {"data": [[1.7100747E12, 0.0], [1.71007482E12, 0.0], [1.71007476E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/successfactor/", "isController": false}, {"data": [[1.7100747E12, 0.0], [1.71007482E12, 0.0], [1.71007464E12, 0.0], [1.71007476E12, 0.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=9007199254740991", "isController": false}, {"data": [[1.7100747E12, 0.0], [1.71007482E12, 0.0], [1.71007464E12, 0.0], [1.71007476E12, 0.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=9&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=5", "isController": false}, {"data": [[1.7100747E12, 23.0], [1.71007482E12, 45.66666666666667], [1.71007476E12, 45.0]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=goal", "isController": false}, {"data": [[1.7100747E12, 0.0], [1.71007482E12, 0.0], [1.71007476E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&page_size=10", "isController": false}, {"data": [[1.7100747E12, 0.0], [1.71007482E12, 0.0], [1.71007476E12, 0.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_user", "isController": false}, {"data": [[1.7100747E12, 0.0], [1.71007482E12, 0.0], [1.71007464E12, 285.0], [1.71007476E12, 0.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?time_period_ids=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=10", "isController": false}, {"data": [[1.7100747E12, 0.0], [1.71007482E12, 0.0], [1.71007476E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/shortcuts/?mode=all", "isController": false}, {"data": [[1.7100747E12, 0.0], [1.71007482E12, 0.0], [1.71007476E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.71007482E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 32.0, "minX": 1.71007464E12, "maxY": 3870.0, "series": [{"data": [[1.7100747E12, 3870.0], [1.71007482E12, 3701.0], [1.71007464E12, 3190.0], [1.71007476E12, 3634.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.7100747E12, 34.0], [1.71007482E12, 32.0], [1.71007464E12, 34.0], [1.71007476E12, 32.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.7100747E12, 194.2], [1.71007482E12, 183.10000000000008], [1.71007464E12, 542.8000000000001], [1.71007476E12, 243.5]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.7100747E12, 2152.959999999943], [1.71007482E12, 937.7099999999888], [1.71007464E12, 3190.0], [1.71007476E12, 3247.550000000001]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.7100747E12, 107.0], [1.71007482E12, 105.5], [1.71007464E12, 110.0], [1.71007476E12, 103.0]], "isOverall": false, "label": "Median", "isController": false}, {"data": [[1.7100747E12, 453.49999999999983], [1.71007482E12, 427.0], [1.71007464E12, 2662.7999999999925], [1.71007476E12, 474.0]], "isOverall": false, "label": "95th percentile", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.71007482E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 69.0, "minX": 1.0, "maxY": 466.0, "series": [{"data": [[8.0, 111.0], [2.0, 454.5], [9.0, 111.0], [10.0, 108.0], [11.0, 94.5], [3.0, 282.5], [12.0, 81.5], [13.0, 69.0], [14.0, 72.5], [4.0, 141.0], [1.0, 466.0], [5.0, 134.0], [6.0, 111.5], [7.0, 112.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[8.0, 128.0], [9.0, 131.0], [10.0, 101.5], [11.0, 78.5], [7.0, 80.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 14.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 69.0, "minX": 1.0, "maxY": 463.0, "series": [{"data": [[8.0, 111.0], [2.0, 436.0], [9.0, 111.0], [10.0, 108.0], [11.0, 92.5], [3.0, 272.5], [12.0, 74.5], [13.0, 69.0], [14.0, 72.5], [4.0, 140.0], [1.0, 463.0], [5.0, 130.0], [6.0, 111.0], [7.0, 112.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[8.0, 128.0], [9.0, 131.0], [10.0, 101.5], [11.0, 78.0], [7.0, 80.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 14.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 0.4, "minX": 1.71007464E12, "maxY": 6.45, "series": [{"data": [[1.7100747E12, 6.45], [1.71007482E12, 4.9], [1.71007464E12, 0.4], [1.71007476E12, 6.25]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.71007482E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.05, "minX": 1.71007464E12, "maxY": 6.283333333333333, "series": [{"data": [[1.7100747E12, 6.283333333333333], [1.71007482E12, 4.766666666666667], [1.71007464E12, 0.38333333333333336], [1.71007476E12, 6.066666666666666]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.7100747E12, 0.05], [1.71007482E12, 0.05], [1.71007476E12, 0.06666666666666667]], "isOverall": false, "label": "400", "isController": false}, {"data": [[1.7100747E12, 0.06666666666666667], [1.71007482E12, 0.05], [1.71007476E12, 0.05]], "isOverall": false, "label": "500", "isController": false}, {"data": [[1.7100747E12, 0.05], [1.71007482E12, 0.05], [1.71007476E12, 0.06666666666666667]], "isOverall": false, "label": "404", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.71007482E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.71007464E12, "maxY": 0.7666666666666667, "series": [{"data": [[1.7100747E12, 0.06666666666666667], [1.71007482E12, 0.05], [1.71007476E12, 0.05]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D-success", "isController": false}, {"data": [[1.7100747E12, 0.05], [1.71007482E12, 0.03333333333333333], [1.71007464E12, 0.016666666666666666], [1.71007476E12, 0.06666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/skills/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380-success", "isController": false}, {"data": [[1.7100747E12, 0.05], [1.71007482E12, 0.05], [1.71007476E12, 0.06666666666666667]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/?with=-success", "isController": false}, {"data": [[1.7100747E12, 0.05], [1.71007482E12, 0.03333333333333333], [1.71007464E12, 0.016666666666666666], [1.71007476E12, 0.06666666666666667]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/bulk_import/?page=1&page_size=10-success", "isController": false}, {"data": [[1.7100747E12, 0.05], [1.71007482E12, 0.03333333333333333], [1.71007464E12, 0.016666666666666666], [1.71007476E12, 0.06666666666666667]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/4d4720e5-9027-4a32-b683-a3ef965009fe/?with=pending_requests%2Cprograms_connected%2Cconnection_availability-success", "isController": false}, {"data": [[1.7100747E12, 0.06666666666666667], [1.71007482E12, 0.05], [1.71007476E12, 0.05]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/?page=1&page_size=10&search=&get_disabled=true&filter=%5B%5D-success", "isController": false}, {"data": [[1.7100747E12, 0.06666666666666667], [1.71007482E12, 0.05], [1.71007476E12, 0.05]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/department/details/-success", "isController": false}, {"data": [[1.7100747E12, 0.06666666666666667], [1.71007482E12, 0.05], [1.71007476E12, 0.05]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=goal-success", "isController": false}, {"data": [[1.7100747E12, 0.16666666666666666], [1.71007482E12, 0.11666666666666667], [1.71007464E12, 0.03333333333333333], [1.71007476E12, 0.18333333333333332]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/opertaions/-success", "isController": false}, {"data": [[1.7100747E12, 0.06666666666666667], [1.71007482E12, 0.05], [1.71007476E12, 0.05]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/compensation_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea&limit=10&offset=0-success", "isController": false}, {"data": [[1.7100747E12, 0.2], [1.71007482E12, 0.15], [1.71007476E12, 0.15]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_ratings_for_org-success", "isController": false}, {"data": [[1.7100747E12, 0.05], [1.71007482E12, 0.03333333333333333], [1.71007464E12, 0.016666666666666666], [1.71007476E12, 0.06666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/experience/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380-success", "isController": false}, {"data": [[1.7100747E12, 0.05], [1.71007482E12, 0.03333333333333333], [1.71007464E12, 0.016666666666666666], [1.71007476E12, 0.06666666666666667]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?time_period_ids=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=10-success", "isController": false}, {"data": [[1.7100747E12, 0.7666666666666667], [1.71007482E12, 0.65], [1.71007476E12, 0.75]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_settings_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-success", "isController": false}, {"data": [[1.7100747E12, 0.13333333333333333], [1.71007482E12, 0.1], [1.71007476E12, 0.1]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competency_types-success", "isController": false}, {"data": [[1.7100747E12, 0.06666666666666667], [1.71007482E12, 0.05], [1.71007476E12, 0.05]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_classification_categories-success", "isController": false}, {"data": [[1.7100747E12, 0.05], [1.71007482E12, 0.05], [1.71007476E12, 0.06666666666666667]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_pas_keys-success", "isController": false}, {"data": [[1.7100747E12, 0.06666666666666667], [1.71007482E12, 0.05], [1.71007476E12, 0.05]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/org/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-success", "isController": false}, {"data": [[1.7100747E12, 0.06666666666666667], [1.71007482E12, 0.05], [1.71007476E12, 0.05]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&page_size=10-success", "isController": false}, {"data": [[1.7100747E12, 0.06666666666666667], [1.71007482E12, 0.05], [1.71007476E12, 0.05]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_resource/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-success", "isController": false}, {"data": [[1.7100747E12, 0.11666666666666667], [1.71007482E12, 0.1], [1.71007476E12, 0.11666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22roles%22%2C%22__iregex%22%2C%22(%3F%3C!_)ADMIN%22%2C%22%22%5D%5D&page_size=10-success", "isController": false}, {"data": [[1.7100747E12, 0.11666666666666667], [1.71007482E12, 0.1], [1.71007476E12, 0.11666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/user_customfield/-success", "isController": false}, {"data": [[1.7100747E12, 0.05], [1.71007482E12, 0.05], [1.71007476E12, 0.06666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/display_settings/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-success", "isController": false}, {"data": [[1.7100747E12, 0.05], [1.71007482E12, 0.05], [1.71007476E12, 0.06666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/-success", "isController": false}, {"data": [[1.7100747E12, 0.05], [1.71007482E12, 0.03333333333333333], [1.71007464E12, 0.016666666666666666], [1.71007476E12, 0.06666666666666667]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=9-success", "isController": false}, {"data": [[1.7100747E12, 0.06666666666666667], [1.71007482E12, 0.05], [1.71007476E12, 0.05]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/pending_surveys/?user=f21dc60a-55d2-43ac-8ad7-2a1aa6362697-success", "isController": false}, {"data": [[1.7100747E12, 0.06666666666666667], [1.71007482E12, 0.05], [1.71007476E12, 0.05]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/code_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-success", "isController": false}, {"data": [[1.7100747E12, 0.05], [1.71007482E12, 0.03333333333333333], [1.71007464E12, 0.016666666666666666], [1.71007476E12, 0.06666666666666667]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/dashboard/?weightage_enabled=true-success", "isController": false}, {"data": [[1.7100747E12, 0.13333333333333333], [1.71007482E12, 0.1], [1.71007476E12, 0.1]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports?is_system_report=true-success", "isController": false}, {"data": [[1.7100747E12, 0.2], [1.71007482E12, 0.15], [1.71007476E12, 0.15]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/my-org/-success", "isController": false}, {"data": [[1.7100747E12, 0.06666666666666667], [1.71007482E12, 0.03333333333333333], [1.71007476E12, 0.06666666666666667]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9-success", "isController": false}, {"data": [[1.7100747E12, 0.06666666666666667], [1.71007482E12, 0.05], [1.71007476E12, 0.05]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/feedback-nomination/?created_by=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&offset=0&limit=10-success", "isController": false}, {"data": [[1.7100747E12, 0.06666666666666667], [1.71007482E12, 0.05], [1.71007476E12, 0.05]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-chart/-success", "isController": false}, {"data": [[1.7100747E12, 0.11666666666666667], [1.71007482E12, 0.1], [1.71007476E12, 0.11666666666666667]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups-success", "isController": false}, {"data": [[1.7100747E12, 0.36666666666666664], [1.71007482E12, 0.26666666666666666], [1.71007464E12, 0.06666666666666667], [1.71007476E12, 0.4666666666666667]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/stats/-success", "isController": false}, {"data": [[1.7100747E12, 0.05], [1.71007482E12, 0.05], [1.71007476E12, 0.06666666666666667]], "isOverall": false, "label": "Test-failure", "isController": true}, {"data": [[1.7100747E12, 0.06666666666666667], [1.71007482E12, 0.05], [1.71007476E12, 0.05]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/my-nominations/?offset=0&limit=10-success", "isController": false}, {"data": [[1.7100747E12, 0.06666666666666667], [1.71007482E12, 0.05], [1.71007476E12, 0.05]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports-success", "isController": false}, {"data": [[1.7100747E12, 0.1], [1.71007482E12, 0.06666666666666667], [1.71007464E12, 0.03333333333333333], [1.71007476E12, 0.13333333333333333]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=10-success", "isController": false}, {"data": [[1.7100747E12, 0.06666666666666667], [1.71007482E12, 0.05], [1.71007476E12, 0.05]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/aspiration_settings/-success", "isController": false}, {"data": [[1.7100747E12, 0.06666666666666667], [1.71007482E12, 0.03333333333333333], [1.71007476E12, 0.06666666666666667]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9&offset=9-success", "isController": false}, {"data": [[1.7100747E12, 0.13333333333333333], [1.71007482E12, 0.1], [1.71007476E12, 0.1]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_org-success", "isController": false}, {"data": [[1.7100747E12, 0.06666666666666667], [1.71007482E12, 0.03333333333333333], [1.71007476E12, 0.06666666666666667]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/programs/?search=&offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697-success", "isController": false}, {"data": [[1.7100747E12, 0.06666666666666667], [1.71007482E12, 0.03333333333333333], [1.71007476E12, 0.06666666666666667]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_template_for_org-success", "isController": false}, {"data": [[1.7100747E12, 0.06666666666666667], [1.71007482E12, 0.05], [1.71007476E12, 0.05]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22manager%22%2C%22__isnull%22%2C%22true%22%2C%22%22%5D%5D&page_size=10-success", "isController": false}, {"data": [[1.7100747E12, 0.05], [1.71007482E12, 0.05], [1.71007476E12, 0.06666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/-success", "isController": false}, {"data": [[1.7100747E12, 0.06666666666666667], [1.71007482E12, 0.05], [1.71007476E12, 0.05]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/document/settings/-success", "isController": false}, {"data": [[1.7100747E12, 0.06666666666666667], [1.71007482E12, 0.05], [1.71007476E12, 0.05]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_from_groups_ids/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups-failure", "isController": false}, {"data": [[1.7100747E12, 0.06666666666666667], [1.71007482E12, 0.05], [1.71007476E12, 0.05]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies?type=undefined-success", "isController": false}, {"data": [[1.7100747E12, 0.05], [1.71007482E12, 0.05], [1.71007476E12, 0.06666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/darwinbox/-success", "isController": false}, {"data": [[1.7100747E12, 0.13333333333333333], [1.71007482E12, 0.1], [1.71007476E12, 0.1]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_user-success", "isController": false}, {"data": [[1.7100747E12, 0.05], [1.71007482E12, 0.05], [1.71007476E12, 0.06666666666666667]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/jira_config/-failure", "isController": false}, {"data": [[1.7100747E12, 0.05], [1.71007482E12, 0.03333333333333333], [1.71007464E12, 0.016666666666666666], [1.71007476E12, 0.06666666666666667]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/values/-success", "isController": false}, {"data": [[1.7100747E12, 0.06666666666666667], [1.71007482E12, 0.05], [1.71007476E12, 0.05]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/surveys/?name=&organization=false&page=1-success", "isController": false}, {"data": [[1.7100747E12, 0.05], [1.71007482E12, 0.05], [1.71007476E12, 0.06666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/eou/-success", "isController": false}, {"data": [[1.7100747E12, 0.06666666666666667], [1.71007482E12, 0.03333333333333333], [1.71007476E12, 0.06666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_users/user/?org_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&dr_count=false-success", "isController": false}, {"data": [[1.7100747E12, 0.05], [1.71007482E12, 0.03333333333333333], [1.71007464E12, 0.016666666666666666], [1.71007476E12, 0.06666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/nylas-success", "isController": false}, {"data": [[1.7100747E12, 0.26666666666666666], [1.71007482E12, 0.2], [1.71007476E12, 0.2]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reports-success", "isController": false}, {"data": [[1.7100747E12, 0.06666666666666667], [1.71007482E12, 0.05], [1.71007476E12, 0.05]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/settings/-success", "isController": false}, {"data": [[1.7100747E12, 0.05], [1.71007482E12, 0.05], [1.71007476E12, 0.06666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/successfactor/-success", "isController": false}, {"data": [[1.7100747E12, 0.05], [1.71007482E12, 0.05], [1.71007476E12, 0.06666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/razorpay/-failure", "isController": false}, {"data": [[1.7100747E12, 0.05], [1.71007482E12, 0.03333333333333333], [1.71007464E12, 0.016666666666666666], [1.71007476E12, 0.06666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/department/-success", "isController": false}, {"data": [[1.7100747E12, 0.05], [1.71007482E12, 0.03333333333333333], [1.71007464E12, 0.016666666666666666], [1.71007476E12, 0.06666666666666667]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/my_objectives/?time_period_id=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=5&sort_by_key=created_at&sort_by_value=DESC-success", "isController": false}, {"data": [[1.7100747E12, 0.05], [1.71007482E12, 0.03333333333333333], [1.71007464E12, 0.016666666666666666], [1.71007476E12, 0.06666666666666667]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=9007199254740991-success", "isController": false}, {"data": [[1.7100747E12, 0.05], [1.71007482E12, 0.05], [1.71007476E12, 0.06666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-config/-success", "isController": false}, {"data": [[1.7100747E12, 0.06666666666666667], [1.71007482E12, 0.05], [1.71007476E12, 0.05]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/shortcuts/?mode=all-success", "isController": false}, {"data": [[1.7100747E12, 0.06666666666666667], [1.71007482E12, 0.05], [1.71007476E12, 0.05]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies_for_user?type_id=undefined&for_rate_tab=false&ou_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697-success", "isController": false}, {"data": [[1.7100747E12, 0.05], [1.71007482E12, 0.03333333333333333], [1.71007464E12, 0.016666666666666666], [1.71007476E12, 0.06666666666666667]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=9&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=5-success", "isController": false}, {"data": [[1.7100747E12, 0.18333333333333332], [1.71007482E12, 0.13333333333333333], [1.71007464E12, 0.016666666666666666], [1.71007476E12, 0.16666666666666666]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea/skills/-success", "isController": false}, {"data": [[1.7100747E12, 0.05], [1.71007482E12, 0.03333333333333333], [1.71007464E12, 0.016666666666666666], [1.71007476E12, 0.06666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D&basic=true-success", "isController": false}, {"data": [[1.7100747E12, 0.06666666666666667], [1.71007482E12, 0.05], [1.71007476E12, 0.05]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_all_system_reports-success", "isController": false}, {"data": [[1.7100747E12, 0.06666666666666667], [1.71007482E12, 0.05], [1.71007476E12, 0.05]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=action_item-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.71007482E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 0.2, "minX": 1.71007464E12, "maxY": 6.283333333333333, "series": [{"data": [[1.7100747E12, 6.283333333333333], [1.71007482E12, 4.766666666666667], [1.71007464E12, 0.38333333333333336], [1.71007476E12, 6.066666666666666]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.7100747E12, 0.21666666666666667], [1.71007482E12, 0.2], [1.71007476E12, 0.25]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.71007482E12, "title": "Total Transactions Per Second"}},
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
