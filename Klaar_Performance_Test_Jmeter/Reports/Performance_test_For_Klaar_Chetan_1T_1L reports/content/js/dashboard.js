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
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 97.22222222222223, "KoPercent": 2.7777777777777777};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9357798165137615, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "https://survey-stage.klaarhq.com/surveys/?name=&organization=false&page=1"], "isController": false}, {"data": [1.0, 500, 1500, "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22manager%22%2C%22__isnull%22%2C%22true%22%2C%22%22%5D%5D&page_size=10"], "isController": false}, {"data": [1.0, 500, 1500, "https://survey-stage.klaarhq.com/feedback-nomination/my-nominations/?offset=0&limit=10"], "isController": false}, {"data": [1.0, 500, 1500, "https://surveyms-stage.klaarhq.com/get_reports"], "isController": false}, {"data": [1.0, 500, 1500, "https://mentoring-stage.klaarhq.com/mentoring/settings/"], "isController": false}, {"data": [1.0, 500, 1500, "https://review-stage.klaarhq.com/get_competency_types"], "isController": false}, {"data": [1.0, 500, 1500, "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9&offset=9"], "isController": false}, {"data": [1.0, 500, 1500, "https://surveyms-stage.klaarhq.com/get_reports?is_system_report=true"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/org/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/department/"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/org_resource/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea"], "isController": false}, {"data": [0.0, 500, 1500, "Test"], "isController": true}, {"data": [1.0, 500, 1500, "https://review-stage.klaarhq.com/get_classification_categories"], "isController": false}, {"data": [1.0, 500, 1500, "https://mentoring-stage.klaarhq.com/mentoring/stats/"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/code_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D&basic=true"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/display_settings/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea"], "isController": false}, {"data": [1.0, 500, 1500, "https://okr-stage.klaarhq.com/performance/values/"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/experience/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/integrations/info/"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/darwinbox/"], "isController": false}, {"data": [1.0, 500, 1500, "https://review-stage.klaarhq.com/get_reports"], "isController": false}, {"data": [1.0, 500, 1500, "https://surveyms-stage.klaarhq.com/get_template_for_org"], "isController": false}, {"data": [1.0, 500, 1500, "https://mentoring-stage.klaarhq.com/mentoring/mentor/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/?with="], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/me/skills/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/aspiration_settings/"], "isController": false}, {"data": [1.0, 500, 1500, "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=action_item"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/org/department/details/"], "isController": false}, {"data": [0.0, 500, 1500, "https://gs-stage.klaarhq.com/get_groups_from_groups_ids/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups"], "isController": false}, {"data": [1.0, 500, 1500, "https://okr-stage.klaarhq.com/performance/my_objectives/?time_period_id=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=5&sort_by_key=created_at&sort_by_value=DESC"], "isController": false}, {"data": [0.0, 500, 1500, "https://okr-stage.klaarhq.com/performance/jira_config/"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/compensation_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea&limit=10&offset=0"], "isController": false}, {"data": [0.0, 500, 1500, "https://okr-stage.klaarhq.com/performance/dashboard/?weightage_enabled=true"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/integrations/info/nylas"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/org_users/user/?org_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&dr_count=false"], "isController": false}, {"data": [0.5, 500, 1500, "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=9"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/my-org/"], "isController": false}, {"data": [1.0, 500, 1500, "https://review-stage.klaarhq.com/get_ratings_for_org"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/org-config/"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/org/document/settings/"], "isController": false}, {"data": [0.5, 500, 1500, "https://survey-stage.klaarhq.com/feedback-nomination/feedback-nomination/?created_by=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&offset=0&limit=10"], "isController": false}, {"data": [1.0, 500, 1500, "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=10"], "isController": false}, {"data": [1.0, 500, 1500, "https://pas-stage.klaarhq.com/get_settings_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea"], "isController": false}, {"data": [1.0, 500, 1500, "https://survey-stage.klaarhq.com/org/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea"], "isController": false}, {"data": [1.0, 500, 1500, "https://okr-stage.klaarhq.com/performance/bulk_import/?page=1&page_size=10"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D"], "isController": false}, {"data": [1.0, 500, 1500, "https://review-stage.klaarhq.com/get_competencies?type=undefined"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea/skills/"], "isController": false}, {"data": [1.0, 500, 1500, "https://mentoring-stage.klaarhq.com/mentoring/programs/?search=&offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697"], "isController": false}, {"data": [1.0, 500, 1500, "https://pas-stage.klaarhq.com/get_pas_keys"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/values/opertaions/"], "isController": false}, {"data": [0.5, 500, 1500, "https://mentoring-stage.klaarhq.com/mentoring/mentor/4d4720e5-9027-4a32-b683-a3ef965009fe/?with=pending_requests%2Cprograms_connected%2Cconnection_availability"], "isController": false}, {"data": [1.0, 500, 1500, "https://review-stage.klaarhq.com/get_competencies_for_user?type_id=undefined&for_rate_tab=false&ou_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697"], "isController": false}, {"data": [1.0, 500, 1500, "https://survey-stage.klaarhq.com/pending_surveys/?user=f21dc60a-55d2-43ac-8ad7-2a1aa6362697"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/eou/"], "isController": false}, {"data": [1.0, 500, 1500, "https://surveyms-stage.klaarhq.com/get_all_system_reports"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/employee/?page=1&page_size=10&search=&get_disabled=true&filter=%5B%5D"], "isController": false}, {"data": [1.0, 500, 1500, "https://gs-stage.klaarhq.com/get_groups_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22roles%22%2C%22__iregex%22%2C%22(%3F%3C!_)ADMIN%22%2C%22%22%5D%5D&page_size=10"], "isController": false}, {"data": [1.0, 500, 1500, "https://review-stage.klaarhq.com/get_reviews_for_org"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/org-chart/"], "isController": false}, {"data": [0.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/razorpay/"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/user_customfield/"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/successfactor/"], "isController": false}, {"data": [1.0, 500, 1500, "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=9007199254740991"], "isController": false}, {"data": [0.5, 500, 1500, "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=9&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=5"], "isController": false}, {"data": [1.0, 500, 1500, "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=goal"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&page_size=10"], "isController": false}, {"data": [1.0, 500, 1500, "https://review-stage.klaarhq.com/get_reviews_for_user"], "isController": false}, {"data": [1.0, 500, 1500, "https://okr-stage.klaarhq.com/performance/time_period/?time_period_ids=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=10"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/shortcuts/?mode=all"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/me/"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 108, 3, 2.7777777777777777, 187.1296296296297, 32, 3431, 115.5, 433.80000000000007, 519.4499999999998, 3207.1699999999914, 5.321769981275254, 34.21649987373115, 3.022849271952301], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["https://survey-stage.klaarhq.com/surveys/?name=&organization=false&page=1", 1, 0, 0.0, 123.0, 123, 123, 123.0, 123.0, 123.0, 123.0, 8.130081300813009, 71.36051829268293, 4.374682418699187], "isController": false}, {"data": ["https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9", 1, 0, 0.0, 100.0, 100, 100, 100.0, 100.0, 100.0, 100.0, 10.0, 24.443359375, 5.29296875], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22manager%22%2C%22__isnull%22%2C%22true%22%2C%22%22%5D%5D&page_size=10", 1, 0, 0.0, 125.0, 125, 125, 125.0, 125.0, 125.0, 125.0, 8.0, 22.296875, 4.9140625], "isController": false}, {"data": ["https://survey-stage.klaarhq.com/feedback-nomination/my-nominations/?offset=0&limit=10", 1, 0, 0.0, 114.0, 114, 114, 114.0, 114.0, 114.0, 114.0, 8.771929824561402, 4.377398574561403, 4.831414473684211], "isController": false}, {"data": ["https://surveyms-stage.klaarhq.com/get_reports", 1, 0, 0.0, 196.0, 196, 196, 196.0, 196.0, 196.0, 196.0, 5.1020408163265305, 1.295440051020408, 3.213687818877551], "isController": false}, {"data": ["https://mentoring-stage.klaarhq.com/mentoring/settings/", 1, 0, 0.0, 98.0, 98, 98, 98.0, 98.0, 98.0, 98.0, 10.204081632653061, 8.001833545918368, 5.311304209183673], "isController": false}, {"data": ["https://review-stage.klaarhq.com/get_competency_types", 2, 0, 0.0, 81.0, 80, 82, 81.0, 82.0, 82.0, 82.0, 4.3383947939262475, 1.1862798264642083, 2.4784774945770063], "isController": false}, {"data": ["https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9&offset=9", 1, 0, 0.0, 86.0, 86, 86, 86.0, 86.0, 86.0, 86.0, 11.627906976744185, 6.018350290697675, 6.256813226744186], "isController": false}, {"data": ["https://surveyms-stage.klaarhq.com/get_reports?is_system_report=true", 2, 0, 0.0, 160.0, 80, 240, 160.0, 240.0, 240.0, 240.0, 1.7889087656529516, 0.45421511627906974, 1.148640149821109], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/org/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/department/", 1, 0, 0.0, 114.0, 114, 114, 114.0, 114.0, 114.0, 114.0, 8.771929824561402, 3.90625, 4.865679824561403], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/org_resource/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", 1, 0, 0.0, 117.0, 117, 117, 117.0, 117.0, 117.0, 117.0, 8.547008547008549, 3.9730235042735043, 4.782652243589744], "isController": false}, {"data": ["Test", 1, 1, 100.0, 20210.0, 20210, 20210, 20210.0, 20210.0, 20210.0, 20210.0, 0.04948045522018802, 34.358715904873826, 3.035413316427511], "isController": true}, {"data": ["https://review-stage.klaarhq.com/get_classification_categories", 1, 0, 0.0, 54.0, 54, 54, 54.0, 54.0, 54.0, 54.0, 18.51851851851852, 5.244502314814815, 10.7421875], "isController": false}, {"data": ["https://mentoring-stage.klaarhq.com/mentoring/stats/", 7, 0, 0.0, 48.142857142857146, 32, 120, 36.0, 120.0, 120.0, 120.0, 0.5057803468208092, 0.25140839505057805, 0.26178084356936415], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/code_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", 1, 0, 0.0, 117.0, 117, 117, 117.0, 117.0, 117.0, 117.0, 8.547008547008549, 11.960803952991453, 4.757612179487179], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D&basic=true", 1, 0, 0.0, 144.0, 144, 144, 144.0, 144.0, 144.0, 144.0, 6.944444444444444, 109.67339409722223, 3.8045247395833335], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/display_settings/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", 1, 0, 0.0, 115.0, 115, 115, 115.0, 115.0, 115.0, 115.0, 8.695652173913043, 12.253736413043478, 5.570652173913043], "isController": false}, {"data": ["https://okr-stage.klaarhq.com/performance/values/", 1, 0, 0.0, 81.0, 81, 81, 81.0, 81.0, 81.0, 81.0, 12.345679012345679, 14.998070987654321, 6.353684413580247], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/experience/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380", 1, 0, 0.0, 111.0, 111, 111, 111.0, 111.0, 111.0, 111.0, 9.00900900900901, 3.862260698198198, 5.032376126126126], "isController": false}, {"data": ["https://um-stage.klaarhq.com/integrations/info/", 1, 0, 0.0, 162.0, 162, 162, 162.0, 162.0, 162.0, 162.0, 6.172839506172839, 2.5619695216049383, 3.1647858796296293], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/darwinbox/", 1, 0, 0.0, 172.0, 172, 172, 172.0, 172.0, 172.0, 172.0, 5.813953488372093, 2.4641170058139537, 2.986464389534884], "isController": false}, {"data": ["https://review-stage.klaarhq.com/get_reports", 4, 0, 0.0, 113.75, 77, 182, 98.0, 182.0, 182.0, 182.0, 6.097560975609756, 2.3878144054878048, 3.83032822027439], "isController": false}, {"data": ["https://surveyms-stage.klaarhq.com/get_template_for_org", 1, 0, 0.0, 399.0, 399, 399, 399.0, 399.0, 399.0, 399.0, 2.506265664160401, 100.38034539473684, 1.7352952694235588], "isController": false}, {"data": ["https://mentoring-stage.klaarhq.com/mentoring/mentor/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/?with=", 1, 0, 0.0, 107.0, 107, 107, 107.0, 107.0, 107.0, 107.0, 9.345794392523365, 15.223422897196262, 5.238755841121495], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/me/skills/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380", 1, 0, 0.0, 111.0, 111, 111, 111.0, 111.0, 111.0, 111.0, 9.00900900900901, 3.862260698198198, 5.0235782657657655], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/aspiration_settings/", 1, 0, 0.0, 134.0, 134, 134, 134.0, 134.0, 134.0, 134.0, 7.462686567164179, 118.5284514925373, 3.9062499999999996], "isController": false}, {"data": ["https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=action_item", 1, 0, 0.0, 88.0, 88, 88, 88.0, 88.0, 88.0, 88.0, 11.363636363636363, 5.038174715909091, 6.192294034090909], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/org/department/details/", 1, 0, 0.0, 471.0, 471, 471, 471.0, 471.0, 471.0, 471.0, 2.1231422505307855, 68.38218219214438, 1.1175524150743101], "isController": false}, {"data": ["https://gs-stage.klaarhq.com/get_groups_from_groups_ids/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", 1, 1, 100.0, 83.0, 83, 83, 83.0, 83.0, 83.0, 83.0, 12.048192771084338, 2.917921686746988, 7.600715361445783], "isController": false}, {"data": ["https://okr-stage.klaarhq.com/performance/my_objectives/?time_period_id=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=5&sort_by_key=created_at&sort_by_value=DESC", 1, 0, 0.0, 320.0, 320, 320, 320.0, 320.0, 320.0, 320.0, 3.125, 48.3551025390625, 1.9744873046875], "isController": false}, {"data": ["https://okr-stage.klaarhq.com/performance/jira_config/", 1, 1, 100.0, 92.0, 92, 92, 92.0, 92.0, 92.0, 92.0, 10.869565217391305, 4.925271739130435, 5.647078804347826], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/compensation_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea&limit=10&offset=0", 1, 0, 0.0, 117.0, 117, 117, 117.0, 117.0, 117.0, 117.0, 8.547008547008549, 11.868990384615383, 4.974626068376068], "isController": false}, {"data": ["https://okr-stage.klaarhq.com/performance/dashboard/?weightage_enabled=true", 1, 0, 0.0, 3431.0, 3431, 3431, 3431.0, 3431.0, 3431.0, 3431.0, 0.29146021568055963, 1.2631840206936753, 0.1573999016321772], "isController": false}, {"data": ["https://um-stage.klaarhq.com/integrations/info/nylas", 1, 0, 0.0, 147.0, 147, 147, 147.0, 147.0, 147.0, 147.0, 6.802721088435374, 2.9429740646258504, 3.5209396258503403], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/org_users/user/?org_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&dr_count=false", 1, 0, 0.0, 128.0, 128, 128, 128.0, 128.0, 128.0, 128.0, 7.8125, 16.22772216796875, 4.53948974609375], "isController": false}, {"data": ["https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=9", 1, 0, 0.0, 944.0, 944, 944, 944.0, 944.0, 944.0, 944.0, 1.0593220338983051, 3.7759037341101696, 0.6982835672669492], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/my-org/", 3, 0, 0.0, 138.66666666666666, 136, 143, 137.0, 143.0, 143.0, 143.0, 0.8472182999152782, 2.7162282017791584, 0.4327101277887602], "isController": false}, {"data": ["https://review-stage.klaarhq.com/get_ratings_for_org", 3, 0, 0.0, 133.66666666666666, 70, 261, 70.0, 261.0, 261.0, 261.0, 0.6599208095028596, 0.26895210074791026, 0.4124505059392873], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/org-config/", 1, 0, 0.0, 106.0, 106, 106, 106.0, 106.0, 106.0, 106.0, 9.433962264150942, 6.227889150943397, 4.855173938679245], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/org/document/settings/", 1, 0, 0.0, 116.0, 116, 116, 116.0, 116.0, 116.0, 116.0, 8.620689655172413, 4.007273706896552, 4.5292295258620685], "isController": false}, {"data": ["https://survey-stage.klaarhq.com/feedback-nomination/feedback-nomination/?created_by=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&offset=0&limit=10", 1, 0, 0.0, 575.0, 575, 575, 575.0, 575.0, 575.0, 575.0, 1.7391304347826089, 6.453804347826088, 1.0478940217391306], "isController": false}, {"data": ["https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=10", 2, 0, 0.0, 467.0, 455, 479, 467.0, 479.0, 479.0, 479.0, 1.3012361743656475, 10.231986011711125, 0.7014476252439819], "isController": false}, {"data": ["https://pas-stage.klaarhq.com/get_settings_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", 13, 0, 0.0, 60.38461538461539, 47, 180, 51.0, 129.59999999999997, 180.0, 180.0, 2.2695530726256985, 43.7044111710021, 1.252243638704609], "isController": false}, {"data": ["https://survey-stage.klaarhq.com/org/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", 1, 0, 0.0, 237.0, 237, 237, 237.0, 237.0, 237.0, 237.0, 4.219409282700422, 459.63953718354435, 2.291007383966245], "isController": false}, {"data": ["https://okr-stage.klaarhq.com/performance/bulk_import/?page=1&page_size=10", 1, 0, 0.0, 80.0, 80, 80, 80.0, 80.0, 80.0, 80.0, 12.5, 5.3955078125, 6.73828125], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D", 1, 0, 0.0, 136.0, 136, 136, 136.0, 136.0, 136.0, 136.0, 7.352941176470588, 144.98362821691177, 3.9493336397058822], "isController": false}, {"data": ["https://review-stage.klaarhq.com/get_competencies?type=undefined", 1, 0, 0.0, 59.0, 59, 59, 59.0, 59.0, 59.0, 59.0, 16.949152542372882, 4.469014830508475, 10.626324152542374], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea/skills/", 3, 0, 0.0, 118.33333333333333, 111, 126, 118.0, 126.0, 126.0, 126.0, 0.3411416875142142, 0.6156541391858085, 0.1878944450761883], "isController": false}, {"data": ["https://mentoring-stage.klaarhq.com/mentoring/programs/?search=&offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", 1, 0, 0.0, 487.0, 487, 487, 487.0, 487.0, 487.0, 487.0, 2.053388090349076, 24.22757315195072, 1.3575622433264887], "isController": false}, {"data": ["https://pas-stage.klaarhq.com/get_pas_keys", 1, 0, 0.0, 98.0, 98, 98, 98.0, 98.0, 98.0, 98.0, 10.204081632653061, 2.8599330357142856, 6.018813775510204], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/values/opertaions/", 3, 0, 0.0, 136.0, 102, 198, 108.0, 198.0, 198.0, 198.0, 0.17843335514185452, 0.40182355171593415, 0.09305020668530305], "isController": false}, {"data": ["https://mentoring-stage.klaarhq.com/mentoring/mentor/4d4720e5-9027-4a32-b683-a3ef965009fe/?with=pending_requests%2Cprograms_connected%2Cconnection_availability", 1, 0, 0.0, 546.0, 546, 546, 546.0, 546.0, 546.0, 546.0, 1.8315018315018314, 3.1997624771062267, 1.1393229166666665], "isController": false}, {"data": ["https://review-stage.klaarhq.com/get_competencies_for_user?type_id=undefined&for_rate_tab=false&ou_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", 1, 0, 0.0, 174.0, 174, 174, 174.0, 174.0, 174.0, 174.0, 5.747126436781609, 1.515355603448276, 3.8950251436781613], "isController": false}, {"data": ["https://survey-stage.klaarhq.com/pending_surveys/?user=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", 1, 0, 0.0, 116.0, 116, 116, 116.0, 116.0, 116.0, 116.0, 8.620689655172413, 3.29168911637931, 4.790207435344827], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/eou/", 1, 0, 0.0, 136.0, 136, 136, 136.0, 136.0, 136.0, 136.0, 7.352941176470588, 15.064912683823529, 3.73391544117647], "isController": false}, {"data": ["https://surveyms-stage.klaarhq.com/get_all_system_reports", 1, 0, 0.0, 124.0, 124, 124, 124.0, 124.0, 124.0, 124.0, 8.064516129032258, 3.433719758064516, 5.804246471774194], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/employee/?page=1&page_size=10&search=&get_disabled=true&filter=%5B%5D", 1, 0, 0.0, 133.0, 133, 133, 133.0, 133.0, 133.0, 133.0, 7.518796992481203, 179.29834351503757, 4.295406484962406], "isController": false}, {"data": ["https://gs-stage.klaarhq.com/get_groups_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", 2, 0, 0.0, 178.0, 110, 246, 178.0, 246.0, 246.0, 246.0, 0.49152125829442117, 8.595862005406733, 0.32688083681494223], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22roles%22%2C%22__iregex%22%2C%22(%3F%3C!_)ADMIN%22%2C%22%22%5D%5D&page_size=10", 2, 0, 0.0, 115.5, 114, 117, 115.5, 117.0, 117.0, 117.0, 0.3988035892323031, 0.6429928963110668, 0.25081006979062814], "isController": false}, {"data": ["https://review-stage.klaarhq.com/get_reviews_for_org", 2, 0, 0.0, 115.5, 79, 152, 115.5, 152.0, 152.0, 152.0, 8.620689655172413, 37.0672817887931, 5.303744612068965], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/org-chart/", 1, 0, 0.0, 110.0, 110, 110, 110.0, 110.0, 110.0, 110.0, 9.09090909090909, 5.024857954545454, 4.669744318181818], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/razorpay/", 1, 1, 100.0, 113.0, 113, 113, 113.0, 113.0, 113.0, 113.0, 8.849557522123893, 4.165514380530973, 4.537126659292035], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/user_customfield/", 2, 0, 0.0, 112.5, 112, 113, 112.5, 113.0, 113.0, 113.0, 1.0204081632653061, 1.0921556122448979, 0.5311304209183674], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/successfactor/", 1, 0, 0.0, 143.0, 143, 143, 143.0, 143.0, 143.0, 143.0, 6.993006993006993, 2.963833041958042, 3.619427447552448], "isController": false}, {"data": ["https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=9007199254740991", 1, 0, 0.0, 433.0, 433, 433, 433.0, 433.0, 433.0, 433.0, 2.3094688221709005, 18.16000288683603, 1.276522806004619], "isController": false}, {"data": ["https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=9&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=5", 1, 0, 0.0, 824.0, 824, 824, 824.0, 824.0, 824.0, 824.0, 1.2135922330097086, 0.5665010618932039, 0.799975348907767], "isController": false}, {"data": ["https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=goal", 1, 0, 0.0, 172.0, 172, 172, 172.0, 172.0, 172.0, 172.0, 5.813953488372093, 2.577670784883721, 3.128406613372093], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&page_size=10", 1, 0, 0.0, 135.0, 135, 135, 135.0, 135.0, 135.0, 135.0, 7.407407407407407, 20.42824074074074, 4.029224537037037], "isController": false}, {"data": ["https://review-stage.klaarhq.com/get_reviews_for_user", 2, 0, 0.0, 95.5, 71, 120, 95.5, 120.0, 120.0, 120.0, 10.416666666666666, 3.997802734375, 6.612141927083333], "isController": false}, {"data": ["https://okr-stage.klaarhq.com/performance/time_period/?time_period_ids=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=10", 1, 0, 0.0, 441.0, 441, 441, 441.0, 441.0, 441.0, 441.0, 2.2675736961451247, 2.936330782312925, 1.3397285997732427], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/shortcuts/?mode=all", 1, 0, 0.0, 137.0, 137, 137, 137.0, 137.0, 137.0, 137.0, 7.299270072992701, 3.4001482664233573, 3.8135834854014594], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/me/", 1, 0, 0.0, 171.0, 171, 171, 171.0, 171.0, 171.0, 171.0, 5.847953216374268, 16.595851608187132, 2.9639528508771926], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["400/Bad Request", 1, 33.333333333333336, 0.9259259259259259], "isController": false}, {"data": ["500/Internal Server Error", 1, 33.333333333333336, 0.9259259259259259], "isController": false}, {"data": ["404/Not Found", 1, 33.333333333333336, 0.9259259259259259], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 108, 3, "400/Bad Request", 1, "500/Internal Server Error", 1, "404/Not Found", 1, "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://gs-stage.klaarhq.com/get_groups_from_groups_ids/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", 1, 1, "500/Internal Server Error", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["https://okr-stage.klaarhq.com/performance/jira_config/", 1, 1, "404/Not Found", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/razorpay/", 1, 1, "400/Bad Request", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
