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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 12.0, "series": [{"data": [[100.0, 1.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/surveys/?name=&organization=false&page=1", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22manager%22%2C%22__isnull%22%2C%22true%22%2C%22%22%5D%5D&page_size=10", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/my-nominations/?offset=0&limit=10", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/settings/", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competency_types", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9&offset=9", "isController": false}, {"data": [[0.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports?is_system_report=true", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/department/", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_resource/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[20200.0, 1.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_classification_categories", "isController": false}, {"data": [[0.0, 6.0], [100.0, 1.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/stats/", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/code_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D&basic=true", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/display_settings/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/values/", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/experience/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/darwinbox/", "isController": false}, {"data": [[0.0, 2.0], [100.0, 2.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reports", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_template_for_org", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/?with=", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/skills/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/aspiration_settings/", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=action_item", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/department/details/", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_from_groups_ids/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/my_objectives/?time_period_id=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=5&sort_by_key=created_at&sort_by_value=DESC", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/jira_config/", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/compensation_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea&limit=10&offset=0", "isController": false}, {"data": [[3400.0, 1.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/dashboard/?weightage_enabled=true", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/nylas", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_users/user/?org_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&dr_count=false", "isController": false}, {"data": [[900.0, 1.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=9", "isController": false}, {"data": [[100.0, 3.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/my-org/", "isController": false}, {"data": [[0.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_ratings_for_org", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-config/", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/document/settings/", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/feedback-nomination/?created_by=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&offset=0&limit=10", "isController": false}, {"data": [[400.0, 2.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=10", "isController": false}, {"data": [[0.0, 12.0], [100.0, 1.0]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_settings_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/org/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/bulk_import/?page=1&page_size=10", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies?type=undefined", "isController": false}, {"data": [[100.0, 3.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea/skills/", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/programs/?search=&offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_pas_keys", "isController": false}, {"data": [[100.0, 3.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/opertaions/", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/4d4720e5-9027-4a32-b683-a3ef965009fe/?with=pending_requests%2Cprograms_connected%2Cconnection_availability", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies_for_user?type_id=undefined&for_rate_tab=false&ou_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/pending_surveys/?user=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/eou/", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_all_system_reports", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/?page=1&page_size=10&search=&get_disabled=true&filter=%5B%5D", "isController": false}, {"data": [[200.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", "isController": false}, {"data": [[100.0, 2.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22roles%22%2C%22__iregex%22%2C%22(%3F%3C!_)ADMIN%22%2C%22%22%5D%5D&page_size=10", "isController": false}, {"data": [[0.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_org", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-chart/", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/razorpay/", "isController": false}, {"data": [[100.0, 2.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/user_customfield/", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/successfactor/", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=9007199254740991", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=9&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=5", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=goal", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&page_size=10", "isController": false}, {"data": [[0.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_user", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?time_period_ids=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=10", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/shortcuts/?mode=all", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 20200.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 1.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 100.0, "series": [{"data": [[0.0, 100.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 4.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 1.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 3.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 1.0, "minX": 1.71007434E12, "maxY": 1.0, "series": [{"data": [[1.71007434E12, 1.0]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.71007434E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 48.142857142857146, "minX": 1.0, "maxY": 20210.0, "series": [{"data": [[1.0, 123.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/surveys/?name=&organization=false&page=1", "isController": false}, {"data": [[1.0, 123.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/surveys/?name=&organization=false&page=1-Aggregated", "isController": false}, {"data": [[1.0, 100.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9", "isController": false}, {"data": [[1.0, 100.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9-Aggregated", "isController": false}, {"data": [[1.0, 125.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22manager%22%2C%22__isnull%22%2C%22true%22%2C%22%22%5D%5D&page_size=10", "isController": false}, {"data": [[1.0, 125.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22manager%22%2C%22__isnull%22%2C%22true%22%2C%22%22%5D%5D&page_size=10-Aggregated", "isController": false}, {"data": [[1.0, 114.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/my-nominations/?offset=0&limit=10", "isController": false}, {"data": [[1.0, 114.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/my-nominations/?offset=0&limit=10-Aggregated", "isController": false}, {"data": [[1.0, 196.0]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports", "isController": false}, {"data": [[1.0, 196.0]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports-Aggregated", "isController": false}, {"data": [[1.0, 98.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/settings/", "isController": false}, {"data": [[1.0, 98.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/settings/-Aggregated", "isController": false}, {"data": [[1.0, 81.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competency_types", "isController": false}, {"data": [[1.0, 81.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competency_types-Aggregated", "isController": false}, {"data": [[1.0, 86.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9&offset=9", "isController": false}, {"data": [[1.0, 86.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9&offset=9-Aggregated", "isController": false}, {"data": [[1.0, 160.0]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports?is_system_report=true", "isController": false}, {"data": [[1.0, 160.0]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports?is_system_report=true-Aggregated", "isController": false}, {"data": [[1.0, 114.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/department/", "isController": false}, {"data": [[1.0, 114.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/department/-Aggregated", "isController": false}, {"data": [[1.0, 117.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_resource/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.0, 117.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_resource/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-Aggregated", "isController": false}, {"data": [[1.0, 20210.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.0, 20210.0]], "isOverall": false, "label": "Test-Aggregated", "isController": true}, {"data": [[1.0, 54.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_classification_categories", "isController": false}, {"data": [[1.0, 54.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_classification_categories-Aggregated", "isController": false}, {"data": [[1.0, 48.142857142857146]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/stats/", "isController": false}, {"data": [[1.0, 48.142857142857146]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/stats/-Aggregated", "isController": false}, {"data": [[1.0, 117.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/code_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.0, 117.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/code_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-Aggregated", "isController": false}, {"data": [[1.0, 144.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D&basic=true", "isController": false}, {"data": [[1.0, 144.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D&basic=true-Aggregated", "isController": false}, {"data": [[1.0, 115.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/display_settings/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.0, 115.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/display_settings/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-Aggregated", "isController": false}, {"data": [[1.0, 81.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/values/", "isController": false}, {"data": [[1.0, 81.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/values/-Aggregated", "isController": false}, {"data": [[1.0, 111.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/experience/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380", "isController": false}, {"data": [[1.0, 111.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/experience/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380-Aggregated", "isController": false}, {"data": [[1.0, 162.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/", "isController": false}, {"data": [[1.0, 162.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/-Aggregated", "isController": false}, {"data": [[1.0, 172.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/darwinbox/", "isController": false}, {"data": [[1.0, 172.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/darwinbox/-Aggregated", "isController": false}, {"data": [[1.0, 113.75]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reports", "isController": false}, {"data": [[1.0, 113.75]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reports-Aggregated", "isController": false}, {"data": [[1.0, 399.0]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_template_for_org", "isController": false}, {"data": [[1.0, 399.0]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_template_for_org-Aggregated", "isController": false}, {"data": [[1.0, 107.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/?with=", "isController": false}, {"data": [[1.0, 107.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/?with=-Aggregated", "isController": false}, {"data": [[1.0, 111.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/skills/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380", "isController": false}, {"data": [[1.0, 111.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/skills/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380-Aggregated", "isController": false}, {"data": [[1.0, 134.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/aspiration_settings/", "isController": false}, {"data": [[1.0, 134.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/aspiration_settings/-Aggregated", "isController": false}, {"data": [[1.0, 88.0]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=action_item", "isController": false}, {"data": [[1.0, 88.0]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=action_item-Aggregated", "isController": false}, {"data": [[1.0, 471.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/department/details/", "isController": false}, {"data": [[1.0, 471.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/department/details/-Aggregated", "isController": false}, {"data": [[1.0, 83.0]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_from_groups_ids/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", "isController": false}, {"data": [[1.0, 83.0]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_from_groups_ids/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups-Aggregated", "isController": false}, {"data": [[1.0, 320.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/my_objectives/?time_period_id=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=5&sort_by_key=created_at&sort_by_value=DESC", "isController": false}, {"data": [[1.0, 320.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/my_objectives/?time_period_id=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=5&sort_by_key=created_at&sort_by_value=DESC-Aggregated", "isController": false}, {"data": [[1.0, 92.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/jira_config/", "isController": false}, {"data": [[1.0, 92.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/jira_config/-Aggregated", "isController": false}, {"data": [[1.0, 117.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/compensation_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea&limit=10&offset=0", "isController": false}, {"data": [[1.0, 117.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/compensation_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea&limit=10&offset=0-Aggregated", "isController": false}, {"data": [[1.0, 3431.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/dashboard/?weightage_enabled=true", "isController": false}, {"data": [[1.0, 3431.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/dashboard/?weightage_enabled=true-Aggregated", "isController": false}, {"data": [[1.0, 147.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/nylas", "isController": false}, {"data": [[1.0, 147.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/nylas-Aggregated", "isController": false}, {"data": [[1.0, 128.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_users/user/?org_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&dr_count=false", "isController": false}, {"data": [[1.0, 128.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_users/user/?org_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&dr_count=false-Aggregated", "isController": false}, {"data": [[1.0, 944.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=9", "isController": false}, {"data": [[1.0, 944.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=9-Aggregated", "isController": false}, {"data": [[1.0, 138.66666666666666]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/my-org/", "isController": false}, {"data": [[1.0, 138.66666666666666]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/my-org/-Aggregated", "isController": false}, {"data": [[1.0, 133.66666666666666]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_ratings_for_org", "isController": false}, {"data": [[1.0, 133.66666666666666]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_ratings_for_org-Aggregated", "isController": false}, {"data": [[1.0, 106.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-config/", "isController": false}, {"data": [[1.0, 106.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-config/-Aggregated", "isController": false}, {"data": [[1.0, 116.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/document/settings/", "isController": false}, {"data": [[1.0, 116.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/document/settings/-Aggregated", "isController": false}, {"data": [[1.0, 575.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/feedback-nomination/?created_by=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&offset=0&limit=10", "isController": false}, {"data": [[1.0, 575.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/feedback-nomination/?created_by=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&offset=0&limit=10-Aggregated", "isController": false}, {"data": [[1.0, 467.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=10", "isController": false}, {"data": [[1.0, 467.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=10-Aggregated", "isController": false}, {"data": [[1.0, 60.38461538461539]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_settings_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.0, 60.38461538461539]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_settings_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-Aggregated", "isController": false}, {"data": [[1.0, 237.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/org/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.0, 237.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/org/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-Aggregated", "isController": false}, {"data": [[1.0, 80.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/bulk_import/?page=1&page_size=10", "isController": false}, {"data": [[1.0, 80.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/bulk_import/?page=1&page_size=10-Aggregated", "isController": false}, {"data": [[1.0, 136.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D", "isController": false}, {"data": [[1.0, 136.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D-Aggregated", "isController": false}, {"data": [[1.0, 59.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies?type=undefined", "isController": false}, {"data": [[1.0, 59.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies?type=undefined-Aggregated", "isController": false}, {"data": [[1.0, 118.33333333333333]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea/skills/", "isController": false}, {"data": [[1.0, 118.33333333333333]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea/skills/-Aggregated", "isController": false}, {"data": [[1.0, 487.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/programs/?search=&offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[1.0, 487.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/programs/?search=&offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697-Aggregated", "isController": false}, {"data": [[1.0, 98.0]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_pas_keys", "isController": false}, {"data": [[1.0, 98.0]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_pas_keys-Aggregated", "isController": false}, {"data": [[1.0, 136.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/opertaions/", "isController": false}, {"data": [[1.0, 136.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/opertaions/-Aggregated", "isController": false}, {"data": [[1.0, 546.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/4d4720e5-9027-4a32-b683-a3ef965009fe/?with=pending_requests%2Cprograms_connected%2Cconnection_availability", "isController": false}, {"data": [[1.0, 546.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/4d4720e5-9027-4a32-b683-a3ef965009fe/?with=pending_requests%2Cprograms_connected%2Cconnection_availability-Aggregated", "isController": false}, {"data": [[1.0, 174.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies_for_user?type_id=undefined&for_rate_tab=false&ou_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[1.0, 174.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies_for_user?type_id=undefined&for_rate_tab=false&ou_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697-Aggregated", "isController": false}, {"data": [[1.0, 116.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/pending_surveys/?user=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[1.0, 116.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/pending_surveys/?user=f21dc60a-55d2-43ac-8ad7-2a1aa6362697-Aggregated", "isController": false}, {"data": [[1.0, 136.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/eou/", "isController": false}, {"data": [[1.0, 136.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/eou/-Aggregated", "isController": false}, {"data": [[1.0, 124.0]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_all_system_reports", "isController": false}, {"data": [[1.0, 124.0]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_all_system_reports-Aggregated", "isController": false}, {"data": [[1.0, 133.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/?page=1&page_size=10&search=&get_disabled=true&filter=%5B%5D", "isController": false}, {"data": [[1.0, 133.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/?page=1&page_size=10&search=&get_disabled=true&filter=%5B%5D-Aggregated", "isController": false}, {"data": [[1.0, 178.0]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", "isController": false}, {"data": [[1.0, 178.0]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups-Aggregated", "isController": false}, {"data": [[1.0, 115.5]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22roles%22%2C%22__iregex%22%2C%22(%3F%3C!_)ADMIN%22%2C%22%22%5D%5D&page_size=10", "isController": false}, {"data": [[1.0, 115.5]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22roles%22%2C%22__iregex%22%2C%22(%3F%3C!_)ADMIN%22%2C%22%22%5D%5D&page_size=10-Aggregated", "isController": false}, {"data": [[1.0, 115.5]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_org", "isController": false}, {"data": [[1.0, 115.5]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_org-Aggregated", "isController": false}, {"data": [[1.0, 110.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-chart/", "isController": false}, {"data": [[1.0, 110.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-chart/-Aggregated", "isController": false}, {"data": [[1.0, 113.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/razorpay/", "isController": false}, {"data": [[1.0, 113.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/razorpay/-Aggregated", "isController": false}, {"data": [[1.0, 112.5]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/user_customfield/", "isController": false}, {"data": [[1.0, 112.5]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/user_customfield/-Aggregated", "isController": false}, {"data": [[1.0, 143.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/successfactor/", "isController": false}, {"data": [[1.0, 143.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/successfactor/-Aggregated", "isController": false}, {"data": [[1.0, 433.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=9007199254740991", "isController": false}, {"data": [[1.0, 433.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=9007199254740991-Aggregated", "isController": false}, {"data": [[1.0, 824.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=9&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=5", "isController": false}, {"data": [[1.0, 824.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=9&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=5-Aggregated", "isController": false}, {"data": [[1.0, 172.0]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=goal", "isController": false}, {"data": [[1.0, 172.0]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=goal-Aggregated", "isController": false}, {"data": [[1.0, 135.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&page_size=10", "isController": false}, {"data": [[1.0, 135.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&page_size=10-Aggregated", "isController": false}, {"data": [[1.0, 95.5]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_user", "isController": false}, {"data": [[1.0, 95.5]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_user-Aggregated", "isController": false}, {"data": [[1.0, 441.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?time_period_ids=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=10", "isController": false}, {"data": [[1.0, 441.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?time_period_ids=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=10-Aggregated", "isController": false}, {"data": [[1.0, 137.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/shortcuts/?mode=all", "isController": false}, {"data": [[1.0, 137.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/shortcuts/?mode=all-Aggregated", "isController": false}, {"data": [[1.0, 171.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/", "isController": false}, {"data": [[1.0, 171.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 1.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 1046.9666666666667, "minX": 1.71007434E12, "maxY": 11850.916666666666, "series": [{"data": [[1.71007434E12, 11850.916666666666]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.71007434E12, 1046.9666666666667]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.71007434E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 48.142857142857146, "minX": 1.71007434E12, "maxY": 20210.0, "series": [{"data": [[1.71007434E12, 123.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/surveys/?name=&organization=false&page=1", "isController": false}, {"data": [[1.71007434E12, 100.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9", "isController": false}, {"data": [[1.71007434E12, 125.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22manager%22%2C%22__isnull%22%2C%22true%22%2C%22%22%5D%5D&page_size=10", "isController": false}, {"data": [[1.71007434E12, 114.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/my-nominations/?offset=0&limit=10", "isController": false}, {"data": [[1.71007434E12, 196.0]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports", "isController": false}, {"data": [[1.71007434E12, 98.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/settings/", "isController": false}, {"data": [[1.71007434E12, 81.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competency_types", "isController": false}, {"data": [[1.71007434E12, 86.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9&offset=9", "isController": false}, {"data": [[1.71007434E12, 160.0]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports?is_system_report=true", "isController": false}, {"data": [[1.71007434E12, 114.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/department/", "isController": false}, {"data": [[1.71007434E12, 117.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_resource/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.71007434E12, 20210.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.71007434E12, 54.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_classification_categories", "isController": false}, {"data": [[1.71007434E12, 48.142857142857146]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/stats/", "isController": false}, {"data": [[1.71007434E12, 117.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/code_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.71007434E12, 144.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D&basic=true", "isController": false}, {"data": [[1.71007434E12, 115.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/display_settings/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.71007434E12, 81.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/values/", "isController": false}, {"data": [[1.71007434E12, 111.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/experience/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380", "isController": false}, {"data": [[1.71007434E12, 162.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/", "isController": false}, {"data": [[1.71007434E12, 172.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/darwinbox/", "isController": false}, {"data": [[1.71007434E12, 113.75]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reports", "isController": false}, {"data": [[1.71007434E12, 399.0]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_template_for_org", "isController": false}, {"data": [[1.71007434E12, 107.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/?with=", "isController": false}, {"data": [[1.71007434E12, 111.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/skills/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380", "isController": false}, {"data": [[1.71007434E12, 134.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/aspiration_settings/", "isController": false}, {"data": [[1.71007434E12, 88.0]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=action_item", "isController": false}, {"data": [[1.71007434E12, 471.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/department/details/", "isController": false}, {"data": [[1.71007434E12, 83.0]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_from_groups_ids/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", "isController": false}, {"data": [[1.71007434E12, 320.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/my_objectives/?time_period_id=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=5&sort_by_key=created_at&sort_by_value=DESC", "isController": false}, {"data": [[1.71007434E12, 92.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/jira_config/", "isController": false}, {"data": [[1.71007434E12, 117.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/compensation_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea&limit=10&offset=0", "isController": false}, {"data": [[1.71007434E12, 3431.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/dashboard/?weightage_enabled=true", "isController": false}, {"data": [[1.71007434E12, 147.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/nylas", "isController": false}, {"data": [[1.71007434E12, 128.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_users/user/?org_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&dr_count=false", "isController": false}, {"data": [[1.71007434E12, 944.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=9", "isController": false}, {"data": [[1.71007434E12, 138.66666666666666]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/my-org/", "isController": false}, {"data": [[1.71007434E12, 133.66666666666666]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_ratings_for_org", "isController": false}, {"data": [[1.71007434E12, 106.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-config/", "isController": false}, {"data": [[1.71007434E12, 116.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/document/settings/", "isController": false}, {"data": [[1.71007434E12, 575.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/feedback-nomination/?created_by=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&offset=0&limit=10", "isController": false}, {"data": [[1.71007434E12, 467.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=10", "isController": false}, {"data": [[1.71007434E12, 60.38461538461539]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_settings_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.71007434E12, 237.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/org/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.71007434E12, 80.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/bulk_import/?page=1&page_size=10", "isController": false}, {"data": [[1.71007434E12, 136.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D", "isController": false}, {"data": [[1.71007434E12, 59.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies?type=undefined", "isController": false}, {"data": [[1.71007434E12, 118.33333333333333]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea/skills/", "isController": false}, {"data": [[1.71007434E12, 487.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/programs/?search=&offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[1.71007434E12, 98.0]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_pas_keys", "isController": false}, {"data": [[1.71007434E12, 136.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/opertaions/", "isController": false}, {"data": [[1.71007434E12, 546.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/4d4720e5-9027-4a32-b683-a3ef965009fe/?with=pending_requests%2Cprograms_connected%2Cconnection_availability", "isController": false}, {"data": [[1.71007434E12, 174.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies_for_user?type_id=undefined&for_rate_tab=false&ou_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[1.71007434E12, 116.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/pending_surveys/?user=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[1.71007434E12, 136.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/eou/", "isController": false}, {"data": [[1.71007434E12, 124.0]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_all_system_reports", "isController": false}, {"data": [[1.71007434E12, 133.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/?page=1&page_size=10&search=&get_disabled=true&filter=%5B%5D", "isController": false}, {"data": [[1.71007434E12, 178.0]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", "isController": false}, {"data": [[1.71007434E12, 115.5]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22roles%22%2C%22__iregex%22%2C%22(%3F%3C!_)ADMIN%22%2C%22%22%5D%5D&page_size=10", "isController": false}, {"data": [[1.71007434E12, 115.5]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_org", "isController": false}, {"data": [[1.71007434E12, 110.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-chart/", "isController": false}, {"data": [[1.71007434E12, 113.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/razorpay/", "isController": false}, {"data": [[1.71007434E12, 112.5]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/user_customfield/", "isController": false}, {"data": [[1.71007434E12, 143.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/successfactor/", "isController": false}, {"data": [[1.71007434E12, 433.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=9007199254740991", "isController": false}, {"data": [[1.71007434E12, 824.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=9&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=5", "isController": false}, {"data": [[1.71007434E12, 172.0]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=goal", "isController": false}, {"data": [[1.71007434E12, 135.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&page_size=10", "isController": false}, {"data": [[1.71007434E12, 95.5]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_user", "isController": false}, {"data": [[1.71007434E12, 441.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?time_period_ids=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=10", "isController": false}, {"data": [[1.71007434E12, 137.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/shortcuts/?mode=all", "isController": false}, {"data": [[1.71007434E12, 171.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.71007434E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 48.142857142857146, "minX": 1.71007434E12, "maxY": 19806.0, "series": [{"data": [[1.71007434E12, 118.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/surveys/?name=&organization=false&page=1", "isController": false}, {"data": [[1.71007434E12, 100.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9", "isController": false}, {"data": [[1.71007434E12, 123.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22manager%22%2C%22__isnull%22%2C%22true%22%2C%22%22%5D%5D&page_size=10", "isController": false}, {"data": [[1.71007434E12, 114.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/my-nominations/?offset=0&limit=10", "isController": false}, {"data": [[1.71007434E12, 196.0]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports", "isController": false}, {"data": [[1.71007434E12, 98.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/settings/", "isController": false}, {"data": [[1.71007434E12, 81.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competency_types", "isController": false}, {"data": [[1.71007434E12, 86.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9&offset=9", "isController": false}, {"data": [[1.71007434E12, 159.5]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports?is_system_report=true", "isController": false}, {"data": [[1.71007434E12, 114.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/department/", "isController": false}, {"data": [[1.71007434E12, 117.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_resource/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.71007434E12, 19806.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.71007434E12, 54.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_classification_categories", "isController": false}, {"data": [[1.71007434E12, 48.142857142857146]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/stats/", "isController": false}, {"data": [[1.71007434E12, 117.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/code_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.71007434E12, 133.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D&basic=true", "isController": false}, {"data": [[1.71007434E12, 115.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/display_settings/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.71007434E12, 80.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/values/", "isController": false}, {"data": [[1.71007434E12, 111.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/experience/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380", "isController": false}, {"data": [[1.71007434E12, 162.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/", "isController": false}, {"data": [[1.71007434E12, 172.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/darwinbox/", "isController": false}, {"data": [[1.71007434E12, 113.75]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reports", "isController": false}, {"data": [[1.71007434E12, 357.0]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_template_for_org", "isController": false}, {"data": [[1.71007434E12, 107.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/?with=", "isController": false}, {"data": [[1.71007434E12, 111.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/skills/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380", "isController": false}, {"data": [[1.71007434E12, 125.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/aspiration_settings/", "isController": false}, {"data": [[1.71007434E12, 87.0]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=action_item", "isController": false}, {"data": [[1.71007434E12, 452.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/department/details/", "isController": false}, {"data": [[1.71007434E12, 83.0]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_from_groups_ids/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", "isController": false}, {"data": [[1.71007434E12, 311.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/my_objectives/?time_period_id=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=5&sort_by_key=created_at&sort_by_value=DESC", "isController": false}, {"data": [[1.71007434E12, 92.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/jira_config/", "isController": false}, {"data": [[1.71007434E12, 117.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/compensation_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea&limit=10&offset=0", "isController": false}, {"data": [[1.71007434E12, 3430.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/dashboard/?weightage_enabled=true", "isController": false}, {"data": [[1.71007434E12, 147.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/nylas", "isController": false}, {"data": [[1.71007434E12, 128.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_users/user/?org_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&dr_count=false", "isController": false}, {"data": [[1.71007434E12, 943.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=9", "isController": false}, {"data": [[1.71007434E12, 138.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/my-org/", "isController": false}, {"data": [[1.71007434E12, 133.33333333333334]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_ratings_for_org", "isController": false}, {"data": [[1.71007434E12, 106.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-config/", "isController": false}, {"data": [[1.71007434E12, 116.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/document/settings/", "isController": false}, {"data": [[1.71007434E12, 575.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/feedback-nomination/?created_by=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&offset=0&limit=10", "isController": false}, {"data": [[1.71007434E12, 464.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=10", "isController": false}, {"data": [[1.71007434E12, 48.846153846153854]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_settings_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.71007434E12, 173.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/org/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.71007434E12, 80.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/bulk_import/?page=1&page_size=10", "isController": false}, {"data": [[1.71007434E12, 128.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D", "isController": false}, {"data": [[1.71007434E12, 59.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies?type=undefined", "isController": false}, {"data": [[1.71007434E12, 118.33333333333333]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea/skills/", "isController": false}, {"data": [[1.71007434E12, 478.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/programs/?search=&offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[1.71007434E12, 98.0]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_pas_keys", "isController": false}, {"data": [[1.71007434E12, 135.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/opertaions/", "isController": false}, {"data": [[1.71007434E12, 546.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/4d4720e5-9027-4a32-b683-a3ef965009fe/?with=pending_requests%2Cprograms_connected%2Cconnection_availability", "isController": false}, {"data": [[1.71007434E12, 174.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies_for_user?type_id=undefined&for_rate_tab=false&ou_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[1.71007434E12, 116.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/pending_surveys/?user=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[1.71007434E12, 136.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/eou/", "isController": false}, {"data": [[1.71007434E12, 124.0]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_all_system_reports", "isController": false}, {"data": [[1.71007434E12, 122.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/?page=1&page_size=10&search=&get_disabled=true&filter=%5B%5D", "isController": false}, {"data": [[1.71007434E12, 159.5]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", "isController": false}, {"data": [[1.71007434E12, 115.5]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22roles%22%2C%22__iregex%22%2C%22(%3F%3C!_)ADMIN%22%2C%22%22%5D%5D&page_size=10", "isController": false}, {"data": [[1.71007434E12, 114.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_org", "isController": false}, {"data": [[1.71007434E12, 110.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-chart/", "isController": false}, {"data": [[1.71007434E12, 113.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/razorpay/", "isController": false}, {"data": [[1.71007434E12, 112.5]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/user_customfield/", "isController": false}, {"data": [[1.71007434E12, 143.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/successfactor/", "isController": false}, {"data": [[1.71007434E12, 430.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=9007199254740991", "isController": false}, {"data": [[1.71007434E12, 824.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=9&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=5", "isController": false}, {"data": [[1.71007434E12, 172.0]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=goal", "isController": false}, {"data": [[1.71007434E12, 135.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&page_size=10", "isController": false}, {"data": [[1.71007434E12, 95.5]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_user", "isController": false}, {"data": [[1.71007434E12, 437.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?time_period_ids=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=10", "isController": false}, {"data": [[1.71007434E12, 137.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/shortcuts/?mode=all", "isController": false}, {"data": [[1.71007434E12, 170.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.71007434E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.71007434E12, "maxY": 1139.0, "series": [{"data": [[1.71007434E12, 0.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/surveys/?name=&organization=false&page=1", "isController": false}, {"data": [[1.71007434E12, 0.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9", "isController": false}, {"data": [[1.71007434E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22manager%22%2C%22__isnull%22%2C%22true%22%2C%22%22%5D%5D&page_size=10", "isController": false}, {"data": [[1.71007434E12, 0.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/my-nominations/?offset=0&limit=10", "isController": false}, {"data": [[1.71007434E12, 0.0]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports", "isController": false}, {"data": [[1.71007434E12, 0.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/settings/", "isController": false}, {"data": [[1.71007434E12, 0.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competency_types", "isController": false}, {"data": [[1.71007434E12, 0.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9&offset=9", "isController": false}, {"data": [[1.71007434E12, 0.0]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports?is_system_report=true", "isController": false}, {"data": [[1.71007434E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/department/", "isController": false}, {"data": [[1.71007434E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_resource/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.71007434E12, 1139.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.71007434E12, 0.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_classification_categories", "isController": false}, {"data": [[1.71007434E12, 12.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/stats/", "isController": false}, {"data": [[1.71007434E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/code_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.71007434E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D&basic=true", "isController": false}, {"data": [[1.71007434E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/display_settings/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.71007434E12, 0.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/values/", "isController": false}, {"data": [[1.71007434E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/experience/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380", "isController": false}, {"data": [[1.71007434E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/", "isController": false}, {"data": [[1.71007434E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/darwinbox/", "isController": false}, {"data": [[1.71007434E12, 0.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reports", "isController": false}, {"data": [[1.71007434E12, 122.0]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_template_for_org", "isController": false}, {"data": [[1.71007434E12, 0.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/?with=", "isController": false}, {"data": [[1.71007434E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/skills/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380", "isController": false}, {"data": [[1.71007434E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/aspiration_settings/", "isController": false}, {"data": [[1.71007434E12, 0.0]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=action_item", "isController": false}, {"data": [[1.71007434E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/department/details/", "isController": false}, {"data": [[1.71007434E12, 0.0]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_from_groups_ids/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", "isController": false}, {"data": [[1.71007434E12, 0.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/my_objectives/?time_period_id=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=5&sort_by_key=created_at&sort_by_value=DESC", "isController": false}, {"data": [[1.71007434E12, 0.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/jira_config/", "isController": false}, {"data": [[1.71007434E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/compensation_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea&limit=10&offset=0", "isController": false}, {"data": [[1.71007434E12, 0.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/dashboard/?weightage_enabled=true", "isController": false}, {"data": [[1.71007434E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/nylas", "isController": false}, {"data": [[1.71007434E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_users/user/?org_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&dr_count=false", "isController": false}, {"data": [[1.71007434E12, 0.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=9", "isController": false}, {"data": [[1.71007434E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/my-org/", "isController": false}, {"data": [[1.71007434E12, 40.66666666666667]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_ratings_for_org", "isController": false}, {"data": [[1.71007434E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-config/", "isController": false}, {"data": [[1.71007434E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/document/settings/", "isController": false}, {"data": [[1.71007434E12, 114.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/feedback-nomination/?created_by=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&offset=0&limit=10", "isController": false}, {"data": [[1.71007434E12, 0.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=10", "isController": false}, {"data": [[1.71007434E12, 8.000000000000002]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_settings_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.71007434E12, 0.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/org/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.71007434E12, 0.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/bulk_import/?page=1&page_size=10", "isController": false}, {"data": [[1.71007434E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D", "isController": false}, {"data": [[1.71007434E12, 0.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies?type=undefined", "isController": false}, {"data": [[1.71007434E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea/skills/", "isController": false}, {"data": [[1.71007434E12, 0.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/programs/?search=&offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[1.71007434E12, 0.0]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_pas_keys", "isController": false}, {"data": [[1.71007434E12, 30.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/opertaions/", "isController": false}, {"data": [[1.71007434E12, 0.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/4d4720e5-9027-4a32-b683-a3ef965009fe/?with=pending_requests%2Cprograms_connected%2Cconnection_availability", "isController": false}, {"data": [[1.71007434E12, 0.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies_for_user?type_id=undefined&for_rate_tab=false&ou_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[1.71007434E12, 0.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/pending_surveys/?user=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[1.71007434E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/eou/", "isController": false}, {"data": [[1.71007434E12, 0.0]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_all_system_reports", "isController": false}, {"data": [[1.71007434E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/?page=1&page_size=10&search=&get_disabled=true&filter=%5B%5D", "isController": false}, {"data": [[1.71007434E12, 44.0]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", "isController": false}, {"data": [[1.71007434E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22roles%22%2C%22__iregex%22%2C%22(%3F%3C!_)ADMIN%22%2C%22%22%5D%5D&page_size=10", "isController": false}, {"data": [[1.71007434E12, 0.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_org", "isController": false}, {"data": [[1.71007434E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-chart/", "isController": false}, {"data": [[1.71007434E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/razorpay/", "isController": false}, {"data": [[1.71007434E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/user_customfield/", "isController": false}, {"data": [[1.71007434E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/successfactor/", "isController": false}, {"data": [[1.71007434E12, 0.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=9007199254740991", "isController": false}, {"data": [[1.71007434E12, 0.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=9&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=5", "isController": false}, {"data": [[1.71007434E12, 86.0]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=goal", "isController": false}, {"data": [[1.71007434E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&page_size=10", "isController": false}, {"data": [[1.71007434E12, 0.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_user", "isController": false}, {"data": [[1.71007434E12, 329.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?time_period_ids=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=10", "isController": false}, {"data": [[1.71007434E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/shortcuts/?mode=all", "isController": false}, {"data": [[1.71007434E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.71007434E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 32.0, "minX": 1.71007434E12, "maxY": 3431.0, "series": [{"data": [[1.71007434E12, 3431.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.71007434E12, 32.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.71007434E12, 436.20000000000005]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.71007434E12, 3281.7799999999943]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.71007434E12, 116.0]], "isOverall": false, "label": "Median", "isController": false}, {"data": [[1.71007434E12, 528.2999999999993]], "isOverall": false, "label": "95th percentile", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.71007434E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 79.0, "minX": 1.0, "maxY": 3431.0, "series": [{"data": [[2.0, 437.0], [4.0, 133.5], [1.0, 3431.0], [8.0, 121.0], [10.0, 110.0], [3.0, 122.5], [6.0, 123.0], [12.0, 79.0], [7.0, 135.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[8.0, 102.5], [6.0, 83.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 12.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 70.5, "minX": 1.0, "maxY": 3430.0, "series": [{"data": [[2.0, 433.5], [4.0, 133.5], [1.0, 3430.0], [8.0, 120.5], [10.0, 109.0], [3.0, 122.5], [6.0, 118.0], [12.0, 70.5], [7.0, 133.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[8.0, 102.5], [6.0, 83.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 12.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 1.8, "minX": 1.71007434E12, "maxY": 1.8, "series": [{"data": [[1.71007434E12, 1.8]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.71007434E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.71007434E12, "maxY": 1.75, "series": [{"data": [[1.71007434E12, 1.75]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.71007434E12, 0.016666666666666666]], "isOverall": false, "label": "400", "isController": false}, {"data": [[1.71007434E12, 0.016666666666666666]], "isOverall": false, "label": "500", "isController": false}, {"data": [[1.71007434E12, 0.016666666666666666]], "isOverall": false, "label": "404", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.71007434E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.71007434E12, "maxY": 0.21666666666666667, "series": [{"data": [[1.71007434E12, 0.016666666666666666]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D-success", "isController": false}, {"data": [[1.71007434E12, 0.016666666666666666]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/skills/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380-success", "isController": false}, {"data": [[1.71007434E12, 0.016666666666666666]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/?with=-success", "isController": false}, {"data": [[1.71007434E12, 0.016666666666666666]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/bulk_import/?page=1&page_size=10-success", "isController": false}, {"data": [[1.71007434E12, 0.016666666666666666]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/4d4720e5-9027-4a32-b683-a3ef965009fe/?with=pending_requests%2Cprograms_connected%2Cconnection_availability-success", "isController": false}, {"data": [[1.71007434E12, 0.016666666666666666]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/?page=1&page_size=10&search=&get_disabled=true&filter=%5B%5D-success", "isController": false}, {"data": [[1.71007434E12, 0.016666666666666666]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/department/details/-success", "isController": false}, {"data": [[1.71007434E12, 0.016666666666666666]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=goal-success", "isController": false}, {"data": [[1.71007434E12, 0.05]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/opertaions/-success", "isController": false}, {"data": [[1.71007434E12, 0.016666666666666666]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/compensation_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea&limit=10&offset=0-success", "isController": false}, {"data": [[1.71007434E12, 0.05]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_ratings_for_org-success", "isController": false}, {"data": [[1.71007434E12, 0.016666666666666666]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/experience/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380-success", "isController": false}, {"data": [[1.71007434E12, 0.016666666666666666]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?time_period_ids=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=10-success", "isController": false}, {"data": [[1.71007434E12, 0.21666666666666667]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_settings_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-success", "isController": false}, {"data": [[1.71007434E12, 0.03333333333333333]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competency_types-success", "isController": false}, {"data": [[1.71007434E12, 0.016666666666666666]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_classification_categories-success", "isController": false}, {"data": [[1.71007434E12, 0.016666666666666666]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_pas_keys-success", "isController": false}, {"data": [[1.71007434E12, 0.016666666666666666]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/org/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-success", "isController": false}, {"data": [[1.71007434E12, 0.016666666666666666]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&page_size=10-success", "isController": false}, {"data": [[1.71007434E12, 0.016666666666666666]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_resource/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-success", "isController": false}, {"data": [[1.71007434E12, 0.03333333333333333]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22roles%22%2C%22__iregex%22%2C%22(%3F%3C!_)ADMIN%22%2C%22%22%5D%5D&page_size=10-success", "isController": false}, {"data": [[1.71007434E12, 0.03333333333333333]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/user_customfield/-success", "isController": false}, {"data": [[1.71007434E12, 0.016666666666666666]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/display_settings/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-success", "isController": false}, {"data": [[1.71007434E12, 0.016666666666666666]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/-success", "isController": false}, {"data": [[1.71007434E12, 0.016666666666666666]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=9-success", "isController": false}, {"data": [[1.71007434E12, 0.016666666666666666]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/pending_surveys/?user=f21dc60a-55d2-43ac-8ad7-2a1aa6362697-success", "isController": false}, {"data": [[1.71007434E12, 0.016666666666666666]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/code_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-success", "isController": false}, {"data": [[1.71007434E12, 0.016666666666666666]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/dashboard/?weightage_enabled=true-success", "isController": false}, {"data": [[1.71007434E12, 0.03333333333333333]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports?is_system_report=true-success", "isController": false}, {"data": [[1.71007434E12, 0.05]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/my-org/-success", "isController": false}, {"data": [[1.71007434E12, 0.016666666666666666]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9-success", "isController": false}, {"data": [[1.71007434E12, 0.016666666666666666]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/feedback-nomination/?created_by=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&offset=0&limit=10-success", "isController": false}, {"data": [[1.71007434E12, 0.016666666666666666]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-chart/-success", "isController": false}, {"data": [[1.71007434E12, 0.03333333333333333]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups-success", "isController": false}, {"data": [[1.71007434E12, 0.11666666666666667]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/stats/-success", "isController": false}, {"data": [[1.71007434E12, 0.016666666666666666]], "isOverall": false, "label": "Test-failure", "isController": true}, {"data": [[1.71007434E12, 0.016666666666666666]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/my-nominations/?offset=0&limit=10-success", "isController": false}, {"data": [[1.71007434E12, 0.016666666666666666]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports-success", "isController": false}, {"data": [[1.71007434E12, 0.03333333333333333]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=10-success", "isController": false}, {"data": [[1.71007434E12, 0.016666666666666666]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/aspiration_settings/-success", "isController": false}, {"data": [[1.71007434E12, 0.016666666666666666]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9&offset=9-success", "isController": false}, {"data": [[1.71007434E12, 0.03333333333333333]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_org-success", "isController": false}, {"data": [[1.71007434E12, 0.016666666666666666]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/programs/?search=&offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697-success", "isController": false}, {"data": [[1.71007434E12, 0.016666666666666666]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_template_for_org-success", "isController": false}, {"data": [[1.71007434E12, 0.016666666666666666]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22manager%22%2C%22__isnull%22%2C%22true%22%2C%22%22%5D%5D&page_size=10-success", "isController": false}, {"data": [[1.71007434E12, 0.016666666666666666]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/-success", "isController": false}, {"data": [[1.71007434E12, 0.016666666666666666]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/document/settings/-success", "isController": false}, {"data": [[1.71007434E12, 0.016666666666666666]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_from_groups_ids/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups-failure", "isController": false}, {"data": [[1.71007434E12, 0.016666666666666666]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies?type=undefined-success", "isController": false}, {"data": [[1.71007434E12, 0.016666666666666666]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/darwinbox/-success", "isController": false}, {"data": [[1.71007434E12, 0.03333333333333333]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_user-success", "isController": false}, {"data": [[1.71007434E12, 0.016666666666666666]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/jira_config/-failure", "isController": false}, {"data": [[1.71007434E12, 0.016666666666666666]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/values/-success", "isController": false}, {"data": [[1.71007434E12, 0.016666666666666666]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/surveys/?name=&organization=false&page=1-success", "isController": false}, {"data": [[1.71007434E12, 0.016666666666666666]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/eou/-success", "isController": false}, {"data": [[1.71007434E12, 0.016666666666666666]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_users/user/?org_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&dr_count=false-success", "isController": false}, {"data": [[1.71007434E12, 0.016666666666666666]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/nylas-success", "isController": false}, {"data": [[1.71007434E12, 0.06666666666666667]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reports-success", "isController": false}, {"data": [[1.71007434E12, 0.016666666666666666]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/settings/-success", "isController": false}, {"data": [[1.71007434E12, 0.016666666666666666]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/successfactor/-success", "isController": false}, {"data": [[1.71007434E12, 0.016666666666666666]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/razorpay/-failure", "isController": false}, {"data": [[1.71007434E12, 0.016666666666666666]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/department/-success", "isController": false}, {"data": [[1.71007434E12, 0.016666666666666666]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/my_objectives/?time_period_id=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=5&sort_by_key=created_at&sort_by_value=DESC-success", "isController": false}, {"data": [[1.71007434E12, 0.016666666666666666]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=9007199254740991-success", "isController": false}, {"data": [[1.71007434E12, 0.016666666666666666]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-config/-success", "isController": false}, {"data": [[1.71007434E12, 0.016666666666666666]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/shortcuts/?mode=all-success", "isController": false}, {"data": [[1.71007434E12, 0.016666666666666666]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies_for_user?type_id=undefined&for_rate_tab=false&ou_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697-success", "isController": false}, {"data": [[1.71007434E12, 0.016666666666666666]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=9&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=5-success", "isController": false}, {"data": [[1.71007434E12, 0.05]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea/skills/-success", "isController": false}, {"data": [[1.71007434E12, 0.016666666666666666]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D&basic=true-success", "isController": false}, {"data": [[1.71007434E12, 0.016666666666666666]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_all_system_reports-success", "isController": false}, {"data": [[1.71007434E12, 0.016666666666666666]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=action_item-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.71007434E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 0.06666666666666667, "minX": 1.71007434E12, "maxY": 1.75, "series": [{"data": [[1.71007434E12, 1.75]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.71007434E12, 0.06666666666666667]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.71007434E12, "title": "Total Transactions Per Second"}},
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
