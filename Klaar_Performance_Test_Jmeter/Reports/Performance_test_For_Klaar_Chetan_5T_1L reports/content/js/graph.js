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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 58.0, "series": [{"data": [[100.0, 5.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/surveys/?name=&organization=false&page=1", "isController": false}, {"data": [[0.0, 2.0], [100.0, 3.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9", "isController": false}, {"data": [[100.0, 4.0], [200.0, 1.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22manager%22%2C%22__isnull%22%2C%22true%22%2C%22%22%5D%5D&page_size=10", "isController": false}, {"data": [[100.0, 5.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/my-nominations/?offset=0&limit=10", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports", "isController": false}, {"data": [[100.0, 5.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/settings/", "isController": false}, {"data": [[0.0, 6.0], [100.0, 4.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competency_types", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9&offset=9", "isController": false}, {"data": [[0.0, 4.0], [600.0, 1.0], [200.0, 1.0], [100.0, 4.0]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports?is_system_report=true", "isController": false}, {"data": [[100.0, 5.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/department/", "isController": false}, {"data": [[100.0, 5.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_resource/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[33100.0, 1.0], [35100.0, 1.0], [28600.0, 1.0], [29700.0, 1.0], [31700.0, 1.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_classification_categories", "isController": false}, {"data": [[0.0, 29.0], [100.0, 5.0], [400.0, 1.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/stats/", "isController": false}, {"data": [[100.0, 4.0], [200.0, 1.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/code_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[100.0, 5.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D&basic=true", "isController": false}, {"data": [[100.0, 5.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/display_settings/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1100.0, 1.0], [600.0, 1.0], [800.0, 1.0], [400.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/values/", "isController": false}, {"data": [[100.0, 5.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/experience/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380", "isController": false}, {"data": [[300.0, 1.0], [100.0, 3.0], [200.0, 1.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/", "isController": false}, {"data": [[100.0, 4.0], [500.0, 1.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/darwinbox/", "isController": false}, {"data": [[0.0, 7.0], [200.0, 2.0], [100.0, 10.0], [500.0, 1.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reports", "isController": false}, {"data": [[400.0, 1.0], [200.0, 2.0], [100.0, 2.0]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_template_for_org", "isController": false}, {"data": [[100.0, 5.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/?with=", "isController": false}, {"data": [[100.0, 5.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/skills/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380", "isController": false}, {"data": [[200.0, 3.0], [100.0, 2.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/aspiration_settings/", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=action_item", "isController": false}, {"data": [[400.0, 1.0], [800.0, 1.0], [900.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/department/details/", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_from_groups_ids/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", "isController": false}, {"data": [[1100.0, 1.0], [2200.0, 1.0], [1200.0, 1.0], [2400.0, 1.0], [1300.0, 1.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/my_objectives/?time_period_id=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=5&sort_by_key=created_at&sort_by_value=DESC", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/jira_config/", "isController": false}, {"data": [[100.0, 5.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/compensation_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea&limit=10&offset=0", "isController": false}, {"data": [[4100.0, 1.0], [4500.0, 1.0], [9500.0, 1.0], [5300.0, 1.0], [6700.0, 1.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/dashboard/?weightage_enabled=true", "isController": false}, {"data": [[100.0, 5.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/nylas", "isController": false}, {"data": [[100.0, 5.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_users/user/?org_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&dr_count=false", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=9", "isController": false}, {"data": [[300.0, 1.0], [100.0, 9.0], [200.0, 5.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/my-org/", "isController": false}, {"data": [[0.0, 9.0], [200.0, 1.0], [100.0, 5.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_ratings_for_org", "isController": false}, {"data": [[600.0, 1.0], [200.0, 1.0], [100.0, 3.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-config/", "isController": false}, {"data": [[100.0, 4.0], [200.0, 1.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/document/settings/", "isController": false}, {"data": [[500.0, 5.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/feedback-nomination/?created_by=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&offset=0&limit=10", "isController": false}, {"data": [[1100.0, 1.0], [2400.0, 1.0], [1500.0, 2.0], [1600.0, 1.0], [1700.0, 1.0], [900.0, 2.0], [1900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=10", "isController": false}, {"data": [[0.0, 58.0], [100.0, 7.0]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_settings_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[300.0, 1.0], [200.0, 4.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/org/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[400.0, 1.0], [6400.0, 1.0], [1700.0, 1.0], [900.0, 2.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/bulk_import/?page=1&page_size=10", "isController": false}, {"data": [[100.0, 5.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies?type=undefined", "isController": false}, {"data": [[100.0, 11.0], [200.0, 3.0], [500.0, 1.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea/skills/", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/programs/?search=&offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_pas_keys", "isController": false}, {"data": [[0.0, 1.0], [200.0, 2.0], [100.0, 12.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/opertaions/", "isController": false}, {"data": [[600.0, 2.0], [700.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/4d4720e5-9027-4a32-b683-a3ef965009fe/?with=pending_requests%2Cprograms_connected%2Cconnection_availability", "isController": false}, {"data": [[0.0, 1.0], [200.0, 1.0], [100.0, 3.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies_for_user?type_id=undefined&for_rate_tab=false&ou_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[100.0, 5.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/pending_surveys/?user=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[100.0, 2.0], [200.0, 3.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/eou/", "isController": false}, {"data": [[0.0, 2.0], [100.0, 3.0]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_all_system_reports", "isController": false}, {"data": [[100.0, 4.0], [200.0, 1.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/?page=1&page_size=10&search=&get_disabled=true&filter=%5B%5D", "isController": false}, {"data": [[0.0, 4.0], [200.0, 2.0], [100.0, 4.0]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", "isController": false}, {"data": [[300.0, 1.0], [100.0, 9.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22roles%22%2C%22__iregex%22%2C%22(%3F%3C!_)ADMIN%22%2C%22%22%5D%5D&page_size=10", "isController": false}, {"data": [[0.0, 6.0], [200.0, 1.0], [100.0, 3.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_org", "isController": false}, {"data": [[300.0, 1.0], [100.0, 4.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-chart/", "isController": false}, {"data": [[300.0, 1.0], [200.0, 1.0], [100.0, 3.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/razorpay/", "isController": false}, {"data": [[300.0, 2.0], [200.0, 1.0], [100.0, 7.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/user_customfield/", "isController": false}, {"data": [[200.0, 1.0], [400.0, 1.0], [100.0, 3.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/successfactor/", "isController": false}, {"data": [[2100.0, 1.0], [1400.0, 1.0], [6300.0, 1.0], [3100.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=9007199254740991", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=9&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=5", "isController": false}, {"data": [[100.0, 4.0], [200.0, 1.0]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=goal", "isController": false}, {"data": [[100.0, 4.0], [200.0, 1.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&page_size=10", "isController": false}, {"data": [[0.0, 6.0], [200.0, 2.0], [100.0, 2.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_user", "isController": false}, {"data": [[1100.0, 2.0], [300.0, 1.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?time_period_ids=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=10", "isController": false}, {"data": [[100.0, 2.0], [200.0, 2.0], [400.0, 1.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/shortcuts/?mode=all", "isController": false}, {"data": [[200.0, 2.0], [400.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 35100.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 15.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 470.0, "series": [{"data": [[0.0, 470.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 36.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 19.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 15.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 2.4846153846153847, "minX": 1.71007536E12, "maxY": 4.990361445783128, "series": [{"data": [[1.71007542E12, 2.4846153846153847], [1.71007536E12, 4.990361445783128]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.71007542E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 34.0, "minX": 1.0, "maxY": 35138.0, "series": [{"data": [[5.0, 118.8]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/surveys/?name=&organization=false&page=1", "isController": false}, {"data": [[5.0, 118.8]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/surveys/?name=&organization=false&page=1-Aggregated", "isController": false}, {"data": [[5.0, 114.6]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9", "isController": false}, {"data": [[5.0, 114.6]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9-Aggregated", "isController": false}, {"data": [[5.0, 156.5], [3.0, 135.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22manager%22%2C%22__isnull%22%2C%22true%22%2C%22%22%5D%5D&page_size=10", "isController": false}, {"data": [[4.6, 152.2]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22manager%22%2C%22__isnull%22%2C%22true%22%2C%22%22%5D%5D&page_size=10-Aggregated", "isController": false}, {"data": [[5.0, 126.6]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/my-nominations/?offset=0&limit=10", "isController": false}, {"data": [[5.0, 126.6]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/my-nominations/?offset=0&limit=10-Aggregated", "isController": false}, {"data": [[5.0, 87.4]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports", "isController": false}, {"data": [[5.0, 87.4]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports-Aggregated", "isController": false}, {"data": [[5.0, 134.5], [3.0, 113.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/settings/", "isController": false}, {"data": [[4.6, 130.2]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/settings/-Aggregated", "isController": false}, {"data": [[4.0, 145.0], [5.0, 78.33333333333333]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competency_types", "isController": false}, {"data": [[4.9, 85.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competency_types-Aggregated", "isController": false}, {"data": [[5.0, 89.6]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9&offset=9", "isController": false}, {"data": [[5.0, 89.6]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9&offset=9-Aggregated", "isController": false}, {"data": [[5.0, 189.89999999999998]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports?is_system_report=true", "isController": false}, {"data": [[5.0, 189.89999999999998]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports?is_system_report=true-Aggregated", "isController": false}, {"data": [[5.0, 118.2]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/department/", "isController": false}, {"data": [[5.0, 118.2]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/department/-Aggregated", "isController": false}, {"data": [[5.0, 115.5], [3.0, 129.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_resource/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[4.6, 118.2]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_resource/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-Aggregated", "isController": false}, {"data": [[4.0, 29728.0], [2.0, 33102.0], [1.0, 35138.0], [5.0, 28636.0], [3.0, 31792.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[3.0, 31679.2]], "isOverall": false, "label": "Test-Aggregated", "isController": true}, {"data": [[5.0, 82.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_classification_categories", "isController": false}, {"data": [[5.0, 82.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_classification_categories-Aggregated", "isController": false}, {"data": [[2.0, 34.0], [1.0, 34.5], [5.0, 65.75862068965516], [3.0, 41.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/stats/", "isController": false}, {"data": [[4.485714285714287, 60.74285714285714]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/stats/-Aggregated", "isController": false}, {"data": [[2.0, 127.0], [5.0, 161.66666666666666], [3.0, 120.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/code_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[4.0, 146.4]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/code_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-Aggregated", "isController": false}, {"data": [[5.0, 151.4]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D&basic=true", "isController": false}, {"data": [[5.0, 151.4]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D&basic=true-Aggregated", "isController": false}, {"data": [[2.0, 138.0], [1.0, 114.0], [5.0, 146.5], [3.0, 142.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/display_settings/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[3.2, 137.4]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/display_settings/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-Aggregated", "isController": false}, {"data": [[5.0, 807.6]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/values/", "isController": false}, {"data": [[5.0, 807.6]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/values/-Aggregated", "isController": false}, {"data": [[5.0, 119.8]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/experience/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380", "isController": false}, {"data": [[5.0, 119.8]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/experience/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380-Aggregated", "isController": false}, {"data": [[2.0, 153.0], [1.0, 160.0], [5.0, 269.5], [3.0, 204.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/", "isController": false}, {"data": [[3.2, 211.2]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/-Aggregated", "isController": false}, {"data": [[1.0, 116.0], [5.0, 332.5], [3.0, 157.5]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/darwinbox/", "isController": false}, {"data": [[3.4, 219.2]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/darwinbox/-Aggregated", "isController": false}, {"data": [[4.0, 513.0], [5.0, 135.8421052631579]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reports", "isController": false}, {"data": [[4.95, 154.7]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reports-Aggregated", "isController": false}, {"data": [[5.0, 269.0]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_template_for_org", "isController": false}, {"data": [[5.0, 269.0]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_template_for_org-Aggregated", "isController": false}, {"data": [[2.0, 115.0], [1.0, 119.0], [5.0, 111.5], [3.0, 125.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/?with=", "isController": false}, {"data": [[3.2, 116.4]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/?with=-Aggregated", "isController": false}, {"data": [[5.0, 116.6]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/skills/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380", "isController": false}, {"data": [[5.0, 116.6]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/skills/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380-Aggregated", "isController": false}, {"data": [[5.0, 221.5], [3.0, 127.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/aspiration_settings/", "isController": false}, {"data": [[4.6, 202.6]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/aspiration_settings/-Aggregated", "isController": false}, {"data": [[2.0, 81.0], [5.0, 99.0], [3.0, 84.0]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=action_item", "isController": false}, {"data": [[4.0, 92.4]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=action_item-Aggregated", "isController": false}, {"data": [[4.0, 976.0], [5.0, 617.0], [3.0, 582.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/department/details/", "isController": false}, {"data": [[4.4, 681.8]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/department/details/-Aggregated", "isController": false}, {"data": [[2.0, 81.0], [5.0, 67.66666666666667], [3.0, 55.0]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_from_groups_ids/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", "isController": false}, {"data": [[4.0, 67.8]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_from_groups_ids/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups-Aggregated", "isController": false}, {"data": [[5.0, 1671.6]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/my_objectives/?time_period_id=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=5&sort_by_key=created_at&sort_by_value=DESC", "isController": false}, {"data": [[5.0, 1671.6]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/my_objectives/?time_period_id=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=5&sort_by_key=created_at&sort_by_value=DESC-Aggregated", "isController": false}, {"data": [[1.0, 94.0], [5.0, 94.5], [3.0, 108.5]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/jira_config/", "isController": false}, {"data": [[3.4, 100.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/jira_config/-Aggregated", "isController": false}, {"data": [[2.0, 133.0], [5.0, 187.33333333333334], [3.0, 148.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/compensation_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea&limit=10&offset=0", "isController": false}, {"data": [[4.0, 168.6]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/compensation_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea&limit=10&offset=0-Aggregated", "isController": false}, {"data": [[5.0, 6089.8]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/dashboard/?weightage_enabled=true", "isController": false}, {"data": [[5.0, 6089.8]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/dashboard/?weightage_enabled=true-Aggregated", "isController": false}, {"data": [[5.0, 141.6]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/nylas", "isController": false}, {"data": [[5.0, 141.6]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/nylas-Aggregated", "isController": false}, {"data": [[5.0, 135.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_users/user/?org_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&dr_count=false", "isController": false}, {"data": [[5.0, 135.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_users/user/?org_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&dr_count=false-Aggregated", "isController": false}, {"data": [[5.0, 38.6]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=9", "isController": false}, {"data": [[5.0, 38.6]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=9-Aggregated", "isController": false}, {"data": [[1.0, 143.0], [5.0, 211.20000000000002], [3.0, 169.5]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/my-org/", "isController": false}, {"data": [[4.2, 195.53333333333336]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/my-org/-Aggregated", "isController": false}, {"data": [[2.0, 60.0], [5.0, 108.84615384615385], [3.0, 63.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_ratings_for_org", "isController": false}, {"data": [[4.666666666666666, 102.53333333333335]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_ratings_for_org-Aggregated", "isController": false}, {"data": [[1.0, 117.0], [5.0, 440.0], [3.0, 167.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-config/", "isController": false}, {"data": [[3.4, 266.2]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-config/-Aggregated", "isController": false}, {"data": [[5.0, 171.75], [3.0, 107.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/document/settings/", "isController": false}, {"data": [[4.6, 158.8]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/document/settings/-Aggregated", "isController": false}, {"data": [[5.0, 574.4]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/feedback-nomination/?created_by=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&offset=0&limit=10", "isController": false}, {"data": [[5.0, 574.4]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/feedback-nomination/?created_by=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&offset=0&limit=10-Aggregated", "isController": false}, {"data": [[5.0, 1498.6999999999998]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=10", "isController": false}, {"data": [[5.0, 1498.6999999999998]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=10-Aggregated", "isController": false}, {"data": [[4.0, 103.0], [2.0, 48.87499999999999], [1.0, 60.42857142857143], [5.0, 60.94285714285714], [3.0, 55.69230769230769]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_settings_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[3.76923076923077, 59.646153846153844]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_settings_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-Aggregated", "isController": false}, {"data": [[5.0, 258.4]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/org/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[5.0, 258.4]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/org/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-Aggregated", "isController": false}, {"data": [[5.0, 2123.8]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/bulk_import/?page=1&page_size=10", "isController": false}, {"data": [[5.0, 2123.8]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/bulk_import/?page=1&page_size=10-Aggregated", "isController": false}, {"data": [[4.0, 195.0], [2.0, 139.0], [5.0, 145.5], [3.0, 135.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D", "isController": false}, {"data": [[3.8, 152.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D-Aggregated", "isController": false}, {"data": [[5.0, 77.4]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies?type=undefined", "isController": false}, {"data": [[5.0, 77.4]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies?type=undefined-Aggregated", "isController": false}, {"data": [[4.0, 341.0], [2.0, 126.0], [5.0, 159.4], [3.0, 124.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea/skills/", "isController": false}, {"data": [[4.3999999999999995, 176.66666666666669]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea/skills/-Aggregated", "isController": false}, {"data": [[5.0, 58.2]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/programs/?search=&offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[5.0, 58.2]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/programs/?search=&offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697-Aggregated", "isController": false}, {"data": [[1.0, 65.0], [5.0, 90.0], [3.0, 77.0]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_pas_keys", "isController": false}, {"data": [[3.4, 79.8]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_pas_keys-Aggregated", "isController": false}, {"data": [[2.0, 114.0], [5.0, 148.6923076923077], [3.0, 114.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/opertaions/", "isController": false}, {"data": [[4.666666666666666, 144.06666666666666]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/opertaions/-Aggregated", "isController": false}, {"data": [[5.0, 618.4]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/4d4720e5-9027-4a32-b683-a3ef965009fe/?with=pending_requests%2Cprograms_connected%2Cconnection_availability", "isController": false}, {"data": [[5.0, 618.4]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/4d4720e5-9027-4a32-b683-a3ef965009fe/?with=pending_requests%2Cprograms_connected%2Cconnection_availability-Aggregated", "isController": false}, {"data": [[4.0, 147.0], [5.0, 121.25]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies_for_user?type_id=undefined&for_rate_tab=false&ou_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[4.8, 126.4]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies_for_user?type_id=undefined&for_rate_tab=false&ou_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697-Aggregated", "isController": false}, {"data": [[5.0, 125.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/pending_surveys/?user=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[5.0, 125.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/pending_surveys/?user=f21dc60a-55d2-43ac-8ad7-2a1aa6362697-Aggregated", "isController": false}, {"data": [[4.0, 202.0], [2.0, 245.0], [1.0, 144.0], [5.0, 151.0], [3.0, 208.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/eou/", "isController": false}, {"data": [[3.0, 190.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/eou/-Aggregated", "isController": false}, {"data": [[5.0, 108.8]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_all_system_reports", "isController": false}, {"data": [[5.0, 108.8]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_all_system_reports-Aggregated", "isController": false}, {"data": [[2.0, 153.0], [5.0, 192.0], [3.0, 162.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/?page=1&page_size=10&search=&get_disabled=true&filter=%5B%5D", "isController": false}, {"data": [[4.0, 178.2]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/?page=1&page_size=10&search=&get_disabled=true&filter=%5B%5D-Aggregated", "isController": false}, {"data": [[2.0, 117.0], [1.0, 79.0], [5.0, 165.16666666666666], [3.0, 138.0]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", "isController": false}, {"data": [[3.9, 146.29999999999998]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups-Aggregated", "isController": false}, {"data": [[4.0, 369.0], [2.0, 126.0], [1.0, 135.0], [5.0, 149.0], [3.0, 137.5]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22roles%22%2C%22__iregex%22%2C%22(%3F%3C!_)ADMIN%22%2C%22%22%5D%5D&page_size=10", "isController": false}, {"data": [[3.8, 165.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22roles%22%2C%22__iregex%22%2C%22(%3F%3C!_)ADMIN%22%2C%22%22%5D%5D&page_size=10-Aggregated", "isController": false}, {"data": [[5.0, 110.50000000000001]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_org", "isController": false}, {"data": [[5.0, 110.50000000000001]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_org-Aggregated", "isController": false}, {"data": [[4.0, 119.0], [5.0, 153.75]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-chart/", "isController": false}, {"data": [[4.8, 146.8]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-chart/-Aggregated", "isController": false}, {"data": [[1.0, 142.0], [5.0, 276.0], [3.0, 123.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/razorpay/", "isController": false}, {"data": [[3.4, 188.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/razorpay/-Aggregated", "isController": false}, {"data": [[2.0, 119.5], [1.0, 104.0], [5.0, 236.2], [3.0, 134.5]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/user_customfield/", "isController": false}, {"data": [[3.6, 179.29999999999998]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/user_customfield/-Aggregated", "isController": false}, {"data": [[1.0, 120.0], [5.0, 323.0], [3.0, 135.5]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/successfactor/", "isController": false}, {"data": [[3.4, 207.4]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/successfactor/-Aggregated", "isController": false}, {"data": [[5.0, 2968.2]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=9007199254740991", "isController": false}, {"data": [[5.0, 2968.2]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=9007199254740991-Aggregated", "isController": false}, {"data": [[5.0, 37.4]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=9&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=5", "isController": false}, {"data": [[5.0, 37.4]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=9&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=5-Aggregated", "isController": false}, {"data": [[2.0, 180.0], [5.0, 187.0], [3.0, 161.0]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=goal", "isController": false}, {"data": [[4.0, 180.4]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=goal-Aggregated", "isController": false}, {"data": [[5.0, 155.25], [3.0, 134.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&page_size=10", "isController": false}, {"data": [[4.6, 151.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&page_size=10-Aggregated", "isController": false}, {"data": [[5.0, 122.89999999999999]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_user", "isController": false}, {"data": [[5.0, 122.89999999999999]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_user-Aggregated", "isController": false}, {"data": [[4.0, 443.3333333333333], [5.0, 1129.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?time_period_ids=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=10", "isController": false}, {"data": [[4.4, 717.6]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?time_period_ids=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=10-Aggregated", "isController": false}, {"data": [[5.0, 286.75], [3.0, 122.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/shortcuts/?mode=all", "isController": false}, {"data": [[4.6, 253.8]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/shortcuts/?mode=all-Aggregated", "isController": false}, {"data": [[4.0, 414.0], [2.0, 150.0], [1.0, 197.0], [5.0, 212.0], [3.0, 223.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/", "isController": false}, {"data": [[3.0, 239.2]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 5.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 1186.95, "minX": 1.71007536E12, "maxY": 43605.0, "series": [{"data": [[1.71007542E12, 15649.316666666668], [1.71007536E12, 43605.0]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.71007542E12, 1186.95], [1.71007536E12, 4047.883333333333]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.71007542E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 36.5, "minX": 1.71007536E12, "maxY": 32440.0, "series": [{"data": [[1.71007536E12, 118.8]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/surveys/?name=&organization=false&page=1", "isController": false}, {"data": [[1.71007536E12, 114.6]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9", "isController": false}, {"data": [[1.71007542E12, 135.0], [1.71007536E12, 156.5]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22manager%22%2C%22__isnull%22%2C%22true%22%2C%22%22%5D%5D&page_size=10", "isController": false}, {"data": [[1.71007536E12, 126.6]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/my-nominations/?offset=0&limit=10", "isController": false}, {"data": [[1.71007536E12, 87.4]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports", "isController": false}, {"data": [[1.71007542E12, 113.0], [1.71007536E12, 134.5]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/settings/", "isController": false}, {"data": [[1.71007542E12, 145.0], [1.71007536E12, 78.33333333333333]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competency_types", "isController": false}, {"data": [[1.71007536E12, 89.6]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9&offset=9", "isController": false}, {"data": [[1.71007536E12, 189.89999999999998]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports?is_system_report=true", "isController": false}, {"data": [[1.71007536E12, 118.2]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/department/", "isController": false}, {"data": [[1.71007542E12, 129.0], [1.71007536E12, 115.5]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_resource/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.71007542E12, 32440.0], [1.71007536E12, 28636.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.71007536E12, 82.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_classification_categories", "isController": false}, {"data": [[1.71007542E12, 36.5], [1.71007536E12, 65.75862068965516]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/stats/", "isController": false}, {"data": [[1.71007542E12, 123.5], [1.71007536E12, 161.66666666666666]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/code_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.71007536E12, 151.4]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D&basic=true", "isController": false}, {"data": [[1.71007542E12, 131.33333333333334], [1.71007536E12, 146.5]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/display_settings/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.71007536E12, 807.6]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/values/", "isController": false}, {"data": [[1.71007536E12, 119.8]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/experience/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380", "isController": false}, {"data": [[1.71007542E12, 172.33333333333334], [1.71007536E12, 269.5]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/", "isController": false}, {"data": [[1.71007542E12, 143.66666666666666], [1.71007536E12, 332.5]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/darwinbox/", "isController": false}, {"data": [[1.71007542E12, 513.0], [1.71007536E12, 135.8421052631579]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reports", "isController": false}, {"data": [[1.71007536E12, 269.0]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_template_for_org", "isController": false}, {"data": [[1.71007542E12, 119.66666666666667], [1.71007536E12, 111.5]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/?with=", "isController": false}, {"data": [[1.71007536E12, 116.6]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/skills/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380", "isController": false}, {"data": [[1.71007542E12, 127.0], [1.71007536E12, 221.5]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/aspiration_settings/", "isController": false}, {"data": [[1.71007542E12, 82.5], [1.71007536E12, 99.0]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=action_item", "isController": false}, {"data": [[1.71007542E12, 779.0], [1.71007536E12, 617.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/department/details/", "isController": false}, {"data": [[1.71007542E12, 68.0], [1.71007536E12, 67.66666666666667]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_from_groups_ids/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", "isController": false}, {"data": [[1.71007536E12, 1671.6]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/my_objectives/?time_period_id=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=5&sort_by_key=created_at&sort_by_value=DESC", "isController": false}, {"data": [[1.71007542E12, 103.66666666666667], [1.71007536E12, 94.5]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/jira_config/", "isController": false}, {"data": [[1.71007542E12, 140.5], [1.71007536E12, 187.33333333333334]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/compensation_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea&limit=10&offset=0", "isController": false}, {"data": [[1.71007536E12, 6089.8]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/dashboard/?weightage_enabled=true", "isController": false}, {"data": [[1.71007536E12, 141.6]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/nylas", "isController": false}, {"data": [[1.71007536E12, 135.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_users/user/?org_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&dr_count=false", "isController": false}, {"data": [[1.71007536E12, 38.6]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=9", "isController": false}, {"data": [[1.71007542E12, 164.2], [1.71007536E12, 211.20000000000002]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/my-org/", "isController": false}, {"data": [[1.71007542E12, 61.5], [1.71007536E12, 108.84615384615385]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_ratings_for_org", "isController": false}, {"data": [[1.71007542E12, 150.33333333333334], [1.71007536E12, 440.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-config/", "isController": false}, {"data": [[1.71007542E12, 107.0], [1.71007536E12, 171.75]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/document/settings/", "isController": false}, {"data": [[1.71007536E12, 574.4]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/feedback-nomination/?created_by=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&offset=0&limit=10", "isController": false}, {"data": [[1.71007536E12, 1498.6999999999998]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=10", "isController": false}, {"data": [[1.71007542E12, 58.13333333333333], [1.71007536E12, 60.94285714285714]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_settings_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.71007536E12, 258.4]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/org/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.71007536E12, 2123.8]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/bulk_import/?page=1&page_size=10", "isController": false}, {"data": [[1.71007542E12, 137.0], [1.71007536E12, 162.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D", "isController": false}, {"data": [[1.71007536E12, 77.4]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies?type=undefined", "isController": false}, {"data": [[1.71007542E12, 211.2], [1.71007536E12, 159.4]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea/skills/", "isController": false}, {"data": [[1.71007536E12, 58.2]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/programs/?search=&offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[1.71007542E12, 73.0], [1.71007536E12, 90.0]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_pas_keys", "isController": false}, {"data": [[1.71007542E12, 114.0], [1.71007536E12, 148.6923076923077]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/opertaions/", "isController": false}, {"data": [[1.71007536E12, 618.4]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/4d4720e5-9027-4a32-b683-a3ef965009fe/?with=pending_requests%2Cprograms_connected%2Cconnection_availability", "isController": false}, {"data": [[1.71007542E12, 147.0], [1.71007536E12, 121.25]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies_for_user?type_id=undefined&for_rate_tab=false&ou_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[1.71007536E12, 125.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/pending_surveys/?user=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[1.71007542E12, 199.75], [1.71007536E12, 151.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/eou/", "isController": false}, {"data": [[1.71007536E12, 108.8]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_all_system_reports", "isController": false}, {"data": [[1.71007542E12, 157.5], [1.71007536E12, 192.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/?page=1&page_size=10&search=&get_disabled=true&filter=%5B%5D", "isController": false}, {"data": [[1.71007542E12, 118.0], [1.71007536E12, 165.16666666666666]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", "isController": false}, {"data": [[1.71007542E12, 181.0], [1.71007536E12, 149.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22roles%22%2C%22__iregex%22%2C%22(%3F%3C!_)ADMIN%22%2C%22%22%5D%5D&page_size=10", "isController": false}, {"data": [[1.71007536E12, 110.50000000000001]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_org", "isController": false}, {"data": [[1.71007542E12, 119.0], [1.71007536E12, 153.75]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-chart/", "isController": false}, {"data": [[1.71007542E12, 129.33333333333334], [1.71007536E12, 276.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/razorpay/", "isController": false}, {"data": [[1.71007542E12, 122.4], [1.71007536E12, 236.2]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/user_customfield/", "isController": false}, {"data": [[1.71007542E12, 130.33333333333334], [1.71007536E12, 323.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/successfactor/", "isController": false}, {"data": [[1.71007536E12, 2968.2]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=9007199254740991", "isController": false}, {"data": [[1.71007536E12, 37.4]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=9&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=5", "isController": false}, {"data": [[1.71007542E12, 170.5], [1.71007536E12, 187.0]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=goal", "isController": false}, {"data": [[1.71007542E12, 134.0], [1.71007536E12, 155.25]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&page_size=10", "isController": false}, {"data": [[1.71007536E12, 122.89999999999999]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_user", "isController": false}, {"data": [[1.71007536E12, 717.6]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?time_period_ids=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=10", "isController": false}, {"data": [[1.71007542E12, 122.0], [1.71007536E12, 286.75]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/shortcuts/?mode=all", "isController": false}, {"data": [[1.71007542E12, 246.0], [1.71007536E12, 212.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.71007542E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 36.5, "minX": 1.71007536E12, "maxY": 32051.0, "series": [{"data": [[1.71007536E12, 114.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/surveys/?name=&organization=false&page=1", "isController": false}, {"data": [[1.71007536E12, 114.4]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9", "isController": false}, {"data": [[1.71007542E12, 135.0], [1.71007536E12, 155.75]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22manager%22%2C%22__isnull%22%2C%22true%22%2C%22%22%5D%5D&page_size=10", "isController": false}, {"data": [[1.71007536E12, 126.6]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/my-nominations/?offset=0&limit=10", "isController": false}, {"data": [[1.71007536E12, 87.4]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports", "isController": false}, {"data": [[1.71007542E12, 113.0], [1.71007536E12, 134.25]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/settings/", "isController": false}, {"data": [[1.71007542E12, 144.0], [1.71007536E12, 78.33333333333333]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competency_types", "isController": false}, {"data": [[1.71007536E12, 89.6]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9&offset=9", "isController": false}, {"data": [[1.71007536E12, 189.89999999999998]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports?is_system_report=true", "isController": false}, {"data": [[1.71007536E12, 118.2]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/department/", "isController": false}, {"data": [[1.71007542E12, 129.0], [1.71007536E12, 115.5]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_resource/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.71007542E12, 32051.0], [1.71007536E12, 28236.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.71007536E12, 82.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_classification_categories", "isController": false}, {"data": [[1.71007542E12, 36.5], [1.71007536E12, 65.75862068965516]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/stats/", "isController": false}, {"data": [[1.71007542E12, 123.5], [1.71007536E12, 161.66666666666666]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/code_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.71007536E12, 142.8]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D&basic=true", "isController": false}, {"data": [[1.71007542E12, 131.33333333333334], [1.71007536E12, 146.5]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/display_settings/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.71007536E12, 807.6]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/values/", "isController": false}, {"data": [[1.71007536E12, 119.8]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/experience/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380", "isController": false}, {"data": [[1.71007542E12, 172.33333333333334], [1.71007536E12, 269.5]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/", "isController": false}, {"data": [[1.71007542E12, 143.66666666666666], [1.71007536E12, 332.5]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/darwinbox/", "isController": false}, {"data": [[1.71007542E12, 513.0], [1.71007536E12, 135.8421052631579]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reports", "isController": false}, {"data": [[1.71007536E12, 230.0]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_template_for_org", "isController": false}, {"data": [[1.71007542E12, 119.66666666666667], [1.71007536E12, 111.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/?with=", "isController": false}, {"data": [[1.71007536E12, 116.6]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/skills/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380", "isController": false}, {"data": [[1.71007542E12, 117.0], [1.71007536E12, 211.75]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/aspiration_settings/", "isController": false}, {"data": [[1.71007542E12, 82.5], [1.71007536E12, 99.0]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=action_item", "isController": false}, {"data": [[1.71007542E12, 759.0], [1.71007536E12, 597.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/department/details/", "isController": false}, {"data": [[1.71007542E12, 68.0], [1.71007536E12, 67.66666666666667]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_from_groups_ids/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", "isController": false}, {"data": [[1.71007536E12, 1660.8]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/my_objectives/?time_period_id=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=5&sort_by_key=created_at&sort_by_value=DESC", "isController": false}, {"data": [[1.71007542E12, 103.66666666666667], [1.71007536E12, 94.5]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/jira_config/", "isController": false}, {"data": [[1.71007542E12, 140.5], [1.71007536E12, 187.33333333333334]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/compensation_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea&limit=10&offset=0", "isController": false}, {"data": [[1.71007536E12, 6089.2]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/dashboard/?weightage_enabled=true", "isController": false}, {"data": [[1.71007536E12, 141.6]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/nylas", "isController": false}, {"data": [[1.71007536E12, 134.4]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_users/user/?org_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&dr_count=false", "isController": false}, {"data": [[1.71007536E12, 38.6]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=9", "isController": false}, {"data": [[1.71007542E12, 163.4], [1.71007536E12, 208.79999999999995]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/my-org/", "isController": false}, {"data": [[1.71007542E12, 61.5], [1.71007536E12, 108.76923076923079]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_ratings_for_org", "isController": false}, {"data": [[1.71007542E12, 150.33333333333334], [1.71007536E12, 440.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-config/", "isController": false}, {"data": [[1.71007542E12, 107.0], [1.71007536E12, 171.75]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/document/settings/", "isController": false}, {"data": [[1.71007536E12, 571.8]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/feedback-nomination/?created_by=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&offset=0&limit=10", "isController": false}, {"data": [[1.71007536E12, 1495.3]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=10", "isController": false}, {"data": [[1.71007542E12, 48.03333333333333], [1.71007536E12, 47.97142857142857]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_settings_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.71007536E12, 194.4]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/org/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.71007536E12, 2123.8]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/bulk_import/?page=1&page_size=10", "isController": false}, {"data": [[1.71007542E12, 127.0], [1.71007536E12, 152.66666666666666]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D", "isController": false}, {"data": [[1.71007536E12, 77.4]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies?type=undefined", "isController": false}, {"data": [[1.71007542E12, 209.6], [1.71007536E12, 159.1]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea/skills/", "isController": false}, {"data": [[1.71007536E12, 49.8]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/programs/?search=&offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[1.71007542E12, 73.0], [1.71007536E12, 90.0]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_pas_keys", "isController": false}, {"data": [[1.71007542E12, 114.0], [1.71007536E12, 148.38461538461536]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/opertaions/", "isController": false}, {"data": [[1.71007536E12, 618.2]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/4d4720e5-9027-4a32-b683-a3ef965009fe/?with=pending_requests%2Cprograms_connected%2Cconnection_availability", "isController": false}, {"data": [[1.71007542E12, 147.0], [1.71007536E12, 121.25]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies_for_user?type_id=undefined&for_rate_tab=false&ou_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[1.71007536E12, 125.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/pending_surveys/?user=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[1.71007542E12, 199.0], [1.71007536E12, 151.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/eou/", "isController": false}, {"data": [[1.71007536E12, 108.8]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_all_system_reports", "isController": false}, {"data": [[1.71007542E12, 144.0], [1.71007536E12, 181.33333333333334]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/?page=1&page_size=10&search=&get_disabled=true&filter=%5B%5D", "isController": false}, {"data": [[1.71007542E12, 110.0], [1.71007536E12, 155.0]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", "isController": false}, {"data": [[1.71007542E12, 180.8], [1.71007536E12, 149.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22roles%22%2C%22__iregex%22%2C%22(%3F%3C!_)ADMIN%22%2C%22%22%5D%5D&page_size=10", "isController": false}, {"data": [[1.71007536E12, 108.1]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_org", "isController": false}, {"data": [[1.71007542E12, 119.0], [1.71007536E12, 153.75]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-chart/", "isController": false}, {"data": [[1.71007542E12, 129.33333333333334], [1.71007536E12, 276.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/razorpay/", "isController": false}, {"data": [[1.71007542E12, 122.2], [1.71007536E12, 236.2]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/user_customfield/", "isController": false}, {"data": [[1.71007542E12, 130.33333333333334], [1.71007536E12, 323.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/successfactor/", "isController": false}, {"data": [[1.71007536E12, 2964.2]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=9007199254740991", "isController": false}, {"data": [[1.71007536E12, 37.4]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=9&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=5", "isController": false}, {"data": [[1.71007542E12, 170.5], [1.71007536E12, 187.0]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=goal", "isController": false}, {"data": [[1.71007542E12, 134.0], [1.71007536E12, 153.25]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&page_size=10", "isController": false}, {"data": [[1.71007536E12, 122.89999999999999]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_user", "isController": false}, {"data": [[1.71007536E12, 716.4]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?time_period_ids=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=10", "isController": false}, {"data": [[1.71007542E12, 122.0], [1.71007536E12, 286.75]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/shortcuts/?mode=all", "isController": false}, {"data": [[1.71007542E12, 245.25], [1.71007536E12, 211.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.71007542E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.71007536E12, "maxY": 946.0, "series": [{"data": [[1.71007536E12, 0.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/surveys/?name=&organization=false&page=1", "isController": false}, {"data": [[1.71007536E12, 0.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9", "isController": false}, {"data": [[1.71007542E12, 0.0], [1.71007536E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22manager%22%2C%22__isnull%22%2C%22true%22%2C%22%22%5D%5D&page_size=10", "isController": false}, {"data": [[1.71007536E12, 0.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/my-nominations/?offset=0&limit=10", "isController": false}, {"data": [[1.71007536E12, 0.0]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports", "isController": false}, {"data": [[1.71007542E12, 0.0], [1.71007536E12, 0.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/settings/", "isController": false}, {"data": [[1.71007542E12, 0.0], [1.71007536E12, 0.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competency_types", "isController": false}, {"data": [[1.71007536E12, 0.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9&offset=9", "isController": false}, {"data": [[1.71007536E12, 0.0]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports?is_system_report=true", "isController": false}, {"data": [[1.71007536E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/department/", "isController": false}, {"data": [[1.71007542E12, 0.0], [1.71007536E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_resource/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.71007542E12, 747.75], [1.71007536E12, 946.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.71007536E12, 0.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_classification_categories", "isController": false}, {"data": [[1.71007542E12, 0.0], [1.71007536E12, 21.965517241379306]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/stats/", "isController": false}, {"data": [[1.71007542E12, 0.0], [1.71007536E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/code_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.71007536E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D&basic=true", "isController": false}, {"data": [[1.71007542E12, 0.0], [1.71007536E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/display_settings/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.71007536E12, 0.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/values/", "isController": false}, {"data": [[1.71007536E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/experience/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380", "isController": false}, {"data": [[1.71007542E12, 0.0], [1.71007536E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/", "isController": false}, {"data": [[1.71007542E12, 0.0], [1.71007536E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/darwinbox/", "isController": false}, {"data": [[1.71007542E12, 0.0], [1.71007536E12, 0.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reports", "isController": false}, {"data": [[1.71007536E12, 70.2]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_template_for_org", "isController": false}, {"data": [[1.71007542E12, 0.0], [1.71007536E12, 0.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/?with=", "isController": false}, {"data": [[1.71007536E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/skills/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380", "isController": false}, {"data": [[1.71007542E12, 0.0], [1.71007536E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/aspiration_settings/", "isController": false}, {"data": [[1.71007542E12, 0.0], [1.71007536E12, 0.0]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=action_item", "isController": false}, {"data": [[1.71007542E12, 0.0], [1.71007536E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/department/details/", "isController": false}, {"data": [[1.71007542E12, 0.0], [1.71007536E12, 0.0]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_from_groups_ids/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", "isController": false}, {"data": [[1.71007536E12, 0.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/my_objectives/?time_period_id=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=5&sort_by_key=created_at&sort_by_value=DESC", "isController": false}, {"data": [[1.71007542E12, 0.0], [1.71007536E12, 0.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/jira_config/", "isController": false}, {"data": [[1.71007542E12, 0.0], [1.71007536E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/compensation_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea&limit=10&offset=0", "isController": false}, {"data": [[1.71007536E12, 0.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/dashboard/?weightage_enabled=true", "isController": false}, {"data": [[1.71007536E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/nylas", "isController": false}, {"data": [[1.71007536E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_users/user/?org_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&dr_count=false", "isController": false}, {"data": [[1.71007536E12, 0.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=9", "isController": false}, {"data": [[1.71007542E12, 0.0], [1.71007536E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/my-org/", "isController": false}, {"data": [[1.71007542E12, 0.0], [1.71007536E12, 25.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_ratings_for_org", "isController": false}, {"data": [[1.71007542E12, 0.0], [1.71007536E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-config/", "isController": false}, {"data": [[1.71007542E12, 0.0], [1.71007536E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/document/settings/", "isController": false}, {"data": [[1.71007536E12, 62.6]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/feedback-nomination/?created_by=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&offset=0&limit=10", "isController": false}, {"data": [[1.71007536E12, 0.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=10", "isController": false}, {"data": [[1.71007542E12, 1.9666666666666666], [1.71007536E12, 8.02857142857143]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_settings_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.71007536E12, 0.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/org/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", "isController": false}, {"data": [[1.71007536E12, 0.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/bulk_import/?page=1&page_size=10", "isController": false}, {"data": [[1.71007542E12, 0.0], [1.71007536E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D", "isController": false}, {"data": [[1.71007536E12, 0.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies?type=undefined", "isController": false}, {"data": [[1.71007542E12, 0.0], [1.71007536E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea/skills/", "isController": false}, {"data": [[1.71007536E12, 0.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/programs/?search=&offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[1.71007542E12, 0.0], [1.71007536E12, 0.0]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_pas_keys", "isController": false}, {"data": [[1.71007542E12, 0.0], [1.71007536E12, 31.538461538461537]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/opertaions/", "isController": false}, {"data": [[1.71007536E12, 0.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/4d4720e5-9027-4a32-b683-a3ef965009fe/?with=pending_requests%2Cprograms_connected%2Cconnection_availability", "isController": false}, {"data": [[1.71007542E12, 0.0], [1.71007536E12, 0.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies_for_user?type_id=undefined&for_rate_tab=false&ou_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[1.71007536E12, 0.0]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/pending_surveys/?user=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", "isController": false}, {"data": [[1.71007542E12, 0.0], [1.71007536E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/eou/", "isController": false}, {"data": [[1.71007536E12, 0.0]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_all_system_reports", "isController": false}, {"data": [[1.71007542E12, 0.0], [1.71007536E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/?page=1&page_size=10&search=&get_disabled=true&filter=%5B%5D", "isController": false}, {"data": [[1.71007542E12, 18.25], [1.71007536E12, 42.33333333333333]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", "isController": false}, {"data": [[1.71007542E12, 0.0], [1.71007536E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22roles%22%2C%22__iregex%22%2C%22(%3F%3C!_)ADMIN%22%2C%22%22%5D%5D&page_size=10", "isController": false}, {"data": [[1.71007536E12, 0.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_org", "isController": false}, {"data": [[1.71007542E12, 0.0], [1.71007536E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-chart/", "isController": false}, {"data": [[1.71007542E12, 0.0], [1.71007536E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/razorpay/", "isController": false}, {"data": [[1.71007542E12, 0.0], [1.71007536E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/user_customfield/", "isController": false}, {"data": [[1.71007542E12, 0.0], [1.71007536E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/successfactor/", "isController": false}, {"data": [[1.71007536E12, 0.0]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=9007199254740991", "isController": false}, {"data": [[1.71007536E12, 0.0]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=9&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=5", "isController": false}, {"data": [[1.71007542E12, 61.0], [1.71007536E12, 69.66666666666667]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=goal", "isController": false}, {"data": [[1.71007542E12, 0.0], [1.71007536E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&page_size=10", "isController": false}, {"data": [[1.71007536E12, 0.0]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_user", "isController": false}, {"data": [[1.71007536E12, 180.6]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?time_period_ids=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=10", "isController": false}, {"data": [[1.71007542E12, 0.0], [1.71007536E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/shortcuts/?mode=all", "isController": false}, {"data": [[1.71007542E12, 0.0], [1.71007536E12, 0.0]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.71007542E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 33.0, "minX": 1.71007536E12, "maxY": 9567.0, "series": [{"data": [[1.71007542E12, 976.0], [1.71007536E12, 9567.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.71007542E12, 33.0], [1.71007536E12, 33.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.71007542E12, 202.20000000000002], [1.71007536E12, 604.3999999999997]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.71007542E12, 901.1400000000009], [1.71007536E12, 6230.720000000015]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.71007542E12, 120.0], [1.71007536E12, 125.0]], "isOverall": false, "label": "Median", "isController": false}, {"data": [[1.71007542E12, 371.2499999999999], [1.71007536E12, 1374.9999999999977]], "isOverall": false, "label": "95th percentile", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.71007542E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 49.0, "minX": 2.0, "maxY": 1747.0, "series": [{"data": [[2.0, 1747.0], [33.0, 109.0], [32.0, 133.0], [9.0, 139.0], [37.0, 112.0], [39.0, 103.5], [10.0, 109.0], [43.0, 79.0], [11.0, 49.0], [3.0, 568.0], [15.0, 121.5], [16.0, 133.5], [18.0, 130.5], [5.0, 1109.0], [22.0, 117.0], [23.0, 107.0], [6.0, 970.0], [26.0, 130.5], [28.0, 122.0], [29.0, 109.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[32.0, 58.0], [37.0, 72.5], [39.0, 96.0], [10.0, 118.0], [22.0, 81.0], [23.0, 120.0], [28.0, 97.0], [15.0, 226.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 43.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 40.0, "minX": 2.0, "maxY": 1745.0, "series": [{"data": [[2.0, 1745.0], [33.0, 109.0], [32.0, 133.0], [9.0, 138.5], [37.0, 111.0], [39.0, 102.5], [10.0, 108.5], [43.0, 78.0], [11.0, 40.0], [3.0, 565.0], [15.0, 118.0], [16.0, 131.5], [18.0, 128.5], [5.0, 1100.0], [22.0, 116.0], [23.0, 107.0], [6.0, 970.0], [26.0, 125.5], [28.0, 122.0], [29.0, 109.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[32.0, 58.0], [37.0, 72.5], [39.0, 96.0], [10.0, 118.0], [22.0, 81.0], [23.0, 120.0], [28.0, 97.0], [15.0, 226.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 43.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 2.033333333333333, "minX": 1.71007536E12, "maxY": 6.966666666666667, "series": [{"data": [[1.71007542E12, 2.033333333333333], [1.71007536E12, 6.966666666666667]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.71007542E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.03333333333333333, "minX": 1.71007536E12, "maxY": 6.783333333333333, "series": [{"data": [[1.71007542E12, 1.9666666666666666], [1.71007536E12, 6.783333333333333]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.71007542E12, 0.05], [1.71007536E12, 0.03333333333333333]], "isOverall": false, "label": "400", "isController": false}, {"data": [[1.71007542E12, 0.03333333333333333], [1.71007536E12, 0.05]], "isOverall": false, "label": "500", "isController": false}, {"data": [[1.71007542E12, 0.05], [1.71007536E12, 0.03333333333333333]], "isOverall": false, "label": "404", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.71007542E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.71007536E12, "maxY": 0.5833333333333334, "series": [{"data": [[1.71007542E12, 0.03333333333333333], [1.71007536E12, 0.05]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D-success", "isController": false}, {"data": [[1.71007536E12, 0.08333333333333333]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/skills/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380-success", "isController": false}, {"data": [[1.71007542E12, 0.05], [1.71007536E12, 0.03333333333333333]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/?with=-success", "isController": false}, {"data": [[1.71007536E12, 0.08333333333333333]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/bulk_import/?page=1&page_size=10-success", "isController": false}, {"data": [[1.71007536E12, 0.08333333333333333]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/4d4720e5-9027-4a32-b683-a3ef965009fe/?with=pending_requests%2Cprograms_connected%2Cconnection_availability-success", "isController": false}, {"data": [[1.71007542E12, 0.03333333333333333], [1.71007536E12, 0.05]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/?page=1&page_size=10&search=&get_disabled=true&filter=%5B%5D-success", "isController": false}, {"data": [[1.71007542E12, 0.03333333333333333], [1.71007536E12, 0.05]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/department/details/-success", "isController": false}, {"data": [[1.71007542E12, 0.03333333333333333], [1.71007536E12, 0.05]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=goal-success", "isController": false}, {"data": [[1.71007542E12, 0.03333333333333333], [1.71007536E12, 0.21666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/opertaions/-success", "isController": false}, {"data": [[1.71007542E12, 0.03333333333333333], [1.71007536E12, 0.05]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/compensation_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea&limit=10&offset=0-success", "isController": false}, {"data": [[1.71007542E12, 0.03333333333333333], [1.71007536E12, 0.21666666666666667]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_ratings_for_org-success", "isController": false}, {"data": [[1.71007536E12, 0.08333333333333333]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/experience/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380-success", "isController": false}, {"data": [[1.71007536E12, 0.08333333333333333]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?time_period_ids=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=10-success", "isController": false}, {"data": [[1.71007542E12, 0.5], [1.71007536E12, 0.5833333333333334]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_settings_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-success", "isController": false}, {"data": [[1.71007542E12, 0.016666666666666666], [1.71007536E12, 0.15]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competency_types-success", "isController": false}, {"data": [[1.71007536E12, 0.08333333333333333]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_classification_categories-success", "isController": false}, {"data": [[1.71007542E12, 0.05], [1.71007536E12, 0.03333333333333333]], "isOverall": false, "label": "https://pas-stage.klaarhq.com/get_pas_keys-success", "isController": false}, {"data": [[1.71007536E12, 0.08333333333333333]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/org/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-success", "isController": false}, {"data": [[1.71007542E12, 0.016666666666666666], [1.71007536E12, 0.06666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&page_size=10-success", "isController": false}, {"data": [[1.71007542E12, 0.016666666666666666], [1.71007536E12, 0.06666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_resource/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-success", "isController": false}, {"data": [[1.71007542E12, 0.08333333333333333], [1.71007536E12, 0.08333333333333333]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22roles%22%2C%22__iregex%22%2C%22(%3F%3C!_)ADMIN%22%2C%22%22%5D%5D&page_size=10-success", "isController": false}, {"data": [[1.71007542E12, 0.08333333333333333], [1.71007536E12, 0.08333333333333333]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/user_customfield/-success", "isController": false}, {"data": [[1.71007542E12, 0.05], [1.71007536E12, 0.03333333333333333]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/display_settings/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-success", "isController": false}, {"data": [[1.71007542E12, 0.06666666666666667], [1.71007536E12, 0.016666666666666666]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/me/-success", "isController": false}, {"data": [[1.71007536E12, 0.08333333333333333]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=9-success", "isController": false}, {"data": [[1.71007536E12, 0.08333333333333333]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/pending_surveys/?user=f21dc60a-55d2-43ac-8ad7-2a1aa6362697-success", "isController": false}, {"data": [[1.71007542E12, 0.03333333333333333], [1.71007536E12, 0.05]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/code_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-success", "isController": false}, {"data": [[1.71007536E12, 0.08333333333333333]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/dashboard/?weightage_enabled=true-success", "isController": false}, {"data": [[1.71007536E12, 0.16666666666666666]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports?is_system_report=true-success", "isController": false}, {"data": [[1.71007542E12, 0.08333333333333333], [1.71007536E12, 0.16666666666666666]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/my-org/-success", "isController": false}, {"data": [[1.71007536E12, 0.08333333333333333]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9-success", "isController": false}, {"data": [[1.71007536E12, 0.08333333333333333]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/feedback-nomination/?created_by=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&offset=0&limit=10-success", "isController": false}, {"data": [[1.71007542E12, 0.016666666666666666], [1.71007536E12, 0.06666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-chart/-success", "isController": false}, {"data": [[1.71007542E12, 0.06666666666666667], [1.71007536E12, 0.1]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups-success", "isController": false}, {"data": [[1.71007542E12, 0.1], [1.71007536E12, 0.48333333333333334]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/stats/-success", "isController": false}, {"data": [[1.71007542E12, 0.06666666666666667], [1.71007536E12, 0.016666666666666666]], "isOverall": false, "label": "Test-failure", "isController": true}, {"data": [[1.71007536E12, 0.08333333333333333]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/feedback-nomination/my-nominations/?offset=0&limit=10-success", "isController": false}, {"data": [[1.71007536E12, 0.08333333333333333]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_reports-success", "isController": false}, {"data": [[1.71007536E12, 0.16666666666666666]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=10-success", "isController": false}, {"data": [[1.71007542E12, 0.016666666666666666], [1.71007536E12, 0.06666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/aspiration_settings/-success", "isController": false}, {"data": [[1.71007536E12, 0.08333333333333333]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9&offset=9-success", "isController": false}, {"data": [[1.71007536E12, 0.16666666666666666]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_org-success", "isController": false}, {"data": [[1.71007536E12, 0.08333333333333333]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/programs/?search=&offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697-success", "isController": false}, {"data": [[1.71007536E12, 0.08333333333333333]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_template_for_org-success", "isController": false}, {"data": [[1.71007542E12, 0.016666666666666666], [1.71007536E12, 0.06666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22manager%22%2C%22__isnull%22%2C%22true%22%2C%22%22%5D%5D&page_size=10-success", "isController": false}, {"data": [[1.71007542E12, 0.05], [1.71007536E12, 0.03333333333333333]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/-success", "isController": false}, {"data": [[1.71007542E12, 0.016666666666666666], [1.71007536E12, 0.06666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/document/settings/-success", "isController": false}, {"data": [[1.71007542E12, 0.03333333333333333], [1.71007536E12, 0.05]], "isOverall": false, "label": "https://gs-stage.klaarhq.com/get_groups_from_groups_ids/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups-failure", "isController": false}, {"data": [[1.71007536E12, 0.08333333333333333]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies?type=undefined-success", "isController": false}, {"data": [[1.71007542E12, 0.05], [1.71007536E12, 0.03333333333333333]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/darwinbox/-success", "isController": false}, {"data": [[1.71007536E12, 0.16666666666666666]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reviews_for_user-success", "isController": false}, {"data": [[1.71007542E12, 0.05], [1.71007536E12, 0.03333333333333333]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/jira_config/-failure", "isController": false}, {"data": [[1.71007536E12, 0.08333333333333333]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/values/-success", "isController": false}, {"data": [[1.71007536E12, 0.08333333333333333]], "isOverall": false, "label": "https://survey-stage.klaarhq.com/surveys/?name=&organization=false&page=1-success", "isController": false}, {"data": [[1.71007542E12, 0.06666666666666667], [1.71007536E12, 0.016666666666666666]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/eou/-success", "isController": false}, {"data": [[1.71007536E12, 0.08333333333333333]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org_users/user/?org_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&dr_count=false-success", "isController": false}, {"data": [[1.71007536E12, 0.08333333333333333]], "isOverall": false, "label": "https://um-stage.klaarhq.com/integrations/info/nylas-success", "isController": false}, {"data": [[1.71007542E12, 0.016666666666666666], [1.71007536E12, 0.31666666666666665]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_reports-success", "isController": false}, {"data": [[1.71007542E12, 0.016666666666666666], [1.71007536E12, 0.06666666666666667]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/settings/-success", "isController": false}, {"data": [[1.71007542E12, 0.05], [1.71007536E12, 0.03333333333333333]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/successfactor/-success", "isController": false}, {"data": [[1.71007542E12, 0.05], [1.71007536E12, 0.03333333333333333]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/razorpay/-failure", "isController": false}, {"data": [[1.71007536E12, 0.08333333333333333]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/department/-success", "isController": false}, {"data": [[1.71007536E12, 0.08333333333333333]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/my_objectives/?time_period_id=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=5&sort_by_key=created_at&sort_by_value=DESC-success", "isController": false}, {"data": [[1.71007536E12, 0.08333333333333333]], "isOverall": false, "label": "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=9007199254740991-success", "isController": false}, {"data": [[1.71007542E12, 0.05], [1.71007536E12, 0.03333333333333333]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org-config/-success", "isController": false}, {"data": [[1.71007542E12, 0.016666666666666666], [1.71007536E12, 0.06666666666666667]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/shortcuts/?mode=all-success", "isController": false}, {"data": [[1.71007542E12, 0.016666666666666666], [1.71007536E12, 0.06666666666666667]], "isOverall": false, "label": "https://review-stage.klaarhq.com/get_competencies_for_user?type_id=undefined&for_rate_tab=false&ou_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697-success", "isController": false}, {"data": [[1.71007536E12, 0.08333333333333333]], "isOverall": false, "label": "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=9&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=5-success", "isController": false}, {"data": [[1.71007542E12, 0.08333333333333333], [1.71007536E12, 0.16666666666666666]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea/skills/-success", "isController": false}, {"data": [[1.71007536E12, 0.08333333333333333]], "isOverall": false, "label": "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D&basic=true-success", "isController": false}, {"data": [[1.71007536E12, 0.08333333333333333]], "isOverall": false, "label": "https://surveyms-stage.klaarhq.com/get_all_system_reports-success", "isController": false}, {"data": [[1.71007542E12, 0.03333333333333333], [1.71007536E12, 0.05]], "isOverall": false, "label": "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=action_item-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.71007542E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 0.13333333333333333, "minX": 1.71007536E12, "maxY": 6.783333333333333, "series": [{"data": [[1.71007542E12, 1.9666666666666666], [1.71007536E12, 6.783333333333333]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.71007542E12, 0.2], [1.71007536E12, 0.13333333333333333]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.71007542E12, "title": "Total Transactions Per Second"}},
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
