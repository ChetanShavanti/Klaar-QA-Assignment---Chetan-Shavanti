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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.941743119266055, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "https://survey-stage.klaarhq.com/surveys/?name=&organization=false&page=1"], "isController": false}, {"data": [1.0, 500, 1500, "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22manager%22%2C%22__isnull%22%2C%22true%22%2C%22%22%5D%5D&page_size=10"], "isController": false}, {"data": [1.0, 500, 1500, "https://survey-stage.klaarhq.com/feedback-nomination/my-nominations/?offset=0&limit=10"], "isController": false}, {"data": [1.0, 500, 1500, "https://surveyms-stage.klaarhq.com/get_reports"], "isController": false}, {"data": [1.0, 500, 1500, "https://mentoring-stage.klaarhq.com/mentoring/settings/"], "isController": false}, {"data": [1.0, 500, 1500, "https://review-stage.klaarhq.com/get_competency_types"], "isController": false}, {"data": [1.0, 500, 1500, "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9&offset=9"], "isController": false}, {"data": [1.0, 500, 1500, "https://surveyms-stage.klaarhq.com/get_reports?is_system_report=true"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/org/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/department/"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/org_resource/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea"], "isController": false}, {"data": [0.0, 500, 1500, "Test"], "isController": true}, {"data": [1.0, 500, 1500, "https://review-stage.klaarhq.com/get_classification_categories"], "isController": false}, {"data": [1.0, 500, 1500, "https://mentoring-stage.klaarhq.com/mentoring/stats/"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/code_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D&basic=true"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/display_settings/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea"], "isController": false}, {"data": [1.0, 500, 1500, "https://okr-stage.klaarhq.com/performance/values/"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/experience/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/integrations/info/"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/darwinbox/"], "isController": false}, {"data": [1.0, 500, 1500, "https://review-stage.klaarhq.com/get_reports"], "isController": false}, {"data": [1.0, 500, 1500, "https://surveyms-stage.klaarhq.com/get_template_for_org"], "isController": false}, {"data": [1.0, 500, 1500, "https://mentoring-stage.klaarhq.com/mentoring/mentor/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/?with="], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/me/skills/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380"], "isController": false}, {"data": [0.95, 500, 1500, "https://um-stage.klaarhq.com/accounts/aspiration_settings/"], "isController": false}, {"data": [1.0, 500, 1500, "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=action_item"], "isController": false}, {"data": [0.8, 500, 1500, "https://um-stage.klaarhq.com/accounts/org/department/details/"], "isController": false}, {"data": [0.0, 500, 1500, "https://gs-stage.klaarhq.com/get_groups_from_groups_ids/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups"], "isController": false}, {"data": [1.0, 500, 1500, "https://okr-stage.klaarhq.com/performance/my_objectives/?time_period_id=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=5&sort_by_key=created_at&sort_by_value=DESC"], "isController": false}, {"data": [0.0, 500, 1500, "https://okr-stage.klaarhq.com/performance/jira_config/"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/compensation_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea&limit=10&offset=0"], "isController": false}, {"data": [0.0, 500, 1500, "https://okr-stage.klaarhq.com/performance/dashboard/?weightage_enabled=true"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/integrations/info/nylas"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/org_users/user/?org_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&dr_count=false"], "isController": false}, {"data": [1.0, 500, 1500, "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=9"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/my-org/"], "isController": false}, {"data": [1.0, 500, 1500, "https://review-stage.klaarhq.com/get_ratings_for_org"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/org-config/"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/org/document/settings/"], "isController": false}, {"data": [0.8, 500, 1500, "https://survey-stage.klaarhq.com/feedback-nomination/feedback-nomination/?created_by=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&offset=0&limit=10"], "isController": false}, {"data": [0.875, 500, 1500, "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=10"], "isController": false}, {"data": [1.0, 500, 1500, "https://pas-stage.klaarhq.com/get_settings_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea"], "isController": false}, {"data": [1.0, 500, 1500, "https://survey-stage.klaarhq.com/org/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea"], "isController": false}, {"data": [1.0, 500, 1500, "https://okr-stage.klaarhq.com/performance/bulk_import/?page=1&page_size=10"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D"], "isController": false}, {"data": [1.0, 500, 1500, "https://review-stage.klaarhq.com/get_competencies?type=undefined"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea/skills/"], "isController": false}, {"data": [1.0, 500, 1500, "https://mentoring-stage.klaarhq.com/mentoring/programs/?search=&offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697"], "isController": false}, {"data": [1.0, 500, 1500, "https://pas-stage.klaarhq.com/get_pas_keys"], "isController": false}, {"data": [0.9666666666666667, 500, 1500, "https://um-stage.klaarhq.com/accounts/values/opertaions/"], "isController": false}, {"data": [0.5, 500, 1500, "https://mentoring-stage.klaarhq.com/mentoring/mentor/4d4720e5-9027-4a32-b683-a3ef965009fe/?with=pending_requests%2Cprograms_connected%2Cconnection_availability"], "isController": false}, {"data": [1.0, 500, 1500, "https://review-stage.klaarhq.com/get_competencies_for_user?type_id=undefined&for_rate_tab=false&ou_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697"], "isController": false}, {"data": [1.0, 500, 1500, "https://survey-stage.klaarhq.com/pending_surveys/?user=f21dc60a-55d2-43ac-8ad7-2a1aa6362697"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/eou/"], "isController": false}, {"data": [1.0, 500, 1500, "https://surveyms-stage.klaarhq.com/get_all_system_reports"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/employee/?page=1&page_size=10&search=&get_disabled=true&filter=%5B%5D"], "isController": false}, {"data": [1.0, 500, 1500, "https://gs-stage.klaarhq.com/get_groups_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22roles%22%2C%22__iregex%22%2C%22(%3F%3C!_)ADMIN%22%2C%22%22%5D%5D&page_size=10"], "isController": false}, {"data": [1.0, 500, 1500, "https://review-stage.klaarhq.com/get_reviews_for_org"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/org-chart/"], "isController": false}, {"data": [0.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/razorpay/"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/user_customfield/"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/successfactor/"], "isController": false}, {"data": [0.95, 500, 1500, "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=9007199254740991"], "isController": false}, {"data": [1.0, 500, 1500, "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=9&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=5"], "isController": false}, {"data": [1.0, 500, 1500, "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=goal"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&page_size=10"], "isController": false}, {"data": [1.0, 500, 1500, "https://review-stage.klaarhq.com/get_reviews_for_user"], "isController": false}, {"data": [1.0, 500, 1500, "https://okr-stage.klaarhq.com/performance/time_period/?time_period_ids=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=10"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/shortcuts/?mode=all"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/me/"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 1080, 30, 2.7777777777777777, 156.03796296296295, 32, 3870, 105.0, 209.69999999999993, 462.7500000000002, 1988.0700000000738, 6.396209653538644, 41.12478484971869, 3.6331479493633405], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["https://survey-stage.klaarhq.com/surveys/?name=&organization=false&page=1", 10, 0, 0.0, 110.19999999999999, 98, 122, 110.0, 121.7, 122.0, 122.0, 0.06551791915088777, 0.5750732981720501, 0.03525427094935465], "isController": false}, {"data": ["https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9", 10, 0, 0.0, 96.4, 85, 103, 97.0, 102.8, 103.0, 103.0, 0.06543817401319232, 0.1599528804248246, 0.03463622101088891], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22manager%22%2C%22__isnull%22%2C%22true%22%2C%22%22%5D%5D&page_size=10", 10, 0, 0.0, 132.5, 117, 193, 128.5, 187.10000000000002, 193.0, 193.0, 0.06567497455094735, 0.18304333727383182, 0.0403413662036581], "isController": false}, {"data": ["https://survey-stage.klaarhq.com/feedback-nomination/my-nominations/?offset=0&limit=10", 10, 0, 0.0, 115.10000000000001, 100, 143, 107.5, 142.3, 143.0, 143.0, 0.06552006552006552, 0.03269604832104832, 0.036087223587223584], "isController": false}, {"data": ["https://surveyms-stage.klaarhq.com/get_reports", 10, 0, 0.0, 80.69999999999999, 66, 135, 75.5, 129.50000000000003, 135.0, 135.0, 0.06556216276462529, 0.016646642889455637, 0.04129647947576495], "isController": false}, {"data": ["https://mentoring-stage.klaarhq.com/mentoring/settings/", 10, 0, 0.0, 115.39999999999999, 94, 236, 99.5, 223.80000000000004, 236.0, 236.0, 0.06582628443537505, 0.05161963515781852, 0.034263095316459866], "isController": false}, {"data": ["https://review-stage.klaarhq.com/get_competency_types", 20, 0, 0.0, 55.7, 50, 80, 53.5, 75.30000000000004, 79.85, 80.0, 0.13103755536336714, 0.035830581544670705, 0.07486032215582987], "isController": false}, {"data": ["https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9&offset=9", 10, 0, 0.0, 86.5, 71, 94, 87.0, 93.9, 94.0, 94.0, 0.06544288472235857, 0.033871805569189485, 0.035213895978534734], "isController": false}, {"data": ["https://surveyms-stage.klaarhq.com/get_reports?is_system_report=true", 20, 0, 0.0, 127.15, 74, 204, 125.0, 193.20000000000005, 203.54999999999998, 204.0, 0.13040189865164437, 0.03310985707951907, 0.08372973472993767], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/org/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/department/", 10, 0, 0.0, 112.9, 101, 126, 110.5, 125.8, 126.0, 126.0, 0.06547030594273967, 0.029154745615126258, 0.036315560327613405], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/org_resource/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", 10, 0, 0.0, 115.30000000000001, 103, 144, 116.0, 141.60000000000002, 144.0, 144.0, 0.06582195162086556, 0.03059692282376172, 0.03683201003784762], "isController": false}, {"data": ["Test", 10, 10, 100.0, 16852.1, 15977, 19365, 16671.5, 19116.600000000002, 19365.0, 19365.0, 0.05921469471864138, 41.11820983245202, 3.632567082847279], "isController": true}, {"data": ["https://review-stage.klaarhq.com/get_classification_categories", 10, 0, 0.0, 53.800000000000004, 48, 65, 53.0, 64.10000000000001, 65.0, 65.0, 0.06565686409685702, 0.01859422908993021, 0.03808611061868463], "isController": false}, {"data": ["https://mentoring-stage.klaarhq.com/mentoring/stats/", 70, 0, 0.0, 44.22857142857141, 32, 370, 34.5, 48.8, 73.05000000000014, 370.0, 0.43053872695848994, 0.21400801955260876, 0.22283742703906217], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/code_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", 10, 0, 0.0, 128.90000000000003, 115, 190, 123.5, 184.00000000000003, 190.0, 190.0, 0.06594479102095725, 0.09228406790335132, 0.036707549689400036], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D&basic=true", 10, 0, 0.0, 128.9, 120, 140, 127.0, 140.0, 140.0, 140.0, 0.06542062188843167, 1.0331858370895675, 0.03584078992129899], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/display_settings/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", 10, 0, 0.0, 107.1, 99, 117, 108.0, 116.7, 117.0, 117.0, 0.06681410312088676, 0.09415307695648396, 0.042802784811818075], "isController": false}, {"data": ["https://okr-stage.klaarhq.com/performance/values/", 10, 0, 0.0, 91.4, 83, 101, 90.5, 101.0, 101.0, 101.0, 0.06568619079210979, 0.0797984583451021, 0.03380529545648618], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/experience/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380", 10, 0, 0.0, 109.3, 99, 124, 108.5, 123.2, 124.0, 124.0, 0.0654338921387722, 0.028052225243086912, 0.036550963186892285], "isController": false}, {"data": ["https://um-stage.klaarhq.com/integrations/info/", 10, 0, 0.0, 163.6, 143, 202, 158.5, 200.20000000000002, 202.0, 202.0, 0.06680606866327737, 0.027727128107317266, 0.03425115825021545], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/darwinbox/", 10, 0, 0.0, 117.5, 104, 194, 110.5, 185.90000000000003, 194.0, 194.0, 0.06678019299475775, 0.028303323984106312, 0.03430310694847908], "isController": false}, {"data": ["https://review-stage.klaarhq.com/get_reports", 40, 0, 0.0, 94.20000000000002, 63, 178, 70.0, 163.8, 176.74999999999997, 178.0, 0.261663657534605, 0.10246789714001622, 0.16437026143470185], "isController": false}, {"data": ["https://surveyms-stage.klaarhq.com/get_template_for_org", 10, 0, 0.0, 189.6, 109, 399, 152.5, 387.1, 399.0, 399.0, 0.06540393470071158, 2.6195425526174656, 0.04528456025664505], "isController": false}, {"data": ["https://mentoring-stage.klaarhq.com/mentoring/mentor/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/?with=", 10, 0, 0.0, 110.8, 102, 115, 111.5, 114.9, 115.0, 115.0, 0.06684894144701219, 0.10889065852892219, 0.037471965225180655], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/me/skills/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380", 10, 0, 0.0, 123.7, 97, 183, 117.5, 178.5, 183.0, 183.0, 0.06543860223145634, 0.02805424451133724, 0.03648968933023591], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/aspiration_settings/", 10, 0, 0.0, 236.8, 120, 876, 133.5, 832.8000000000002, 876.0, 876.0, 0.0658154534684744, 1.0453345070422535, 0.034450276424904565], "isController": false}, {"data": ["https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=action_item", 10, 0, 0.0, 97.10000000000001, 86, 131, 91.5, 129.70000000000002, 131.0, 131.0, 0.06591870904800201, 0.029225677644329012, 0.03592054653201672], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/org/department/details/", 10, 0, 0.0, 504.80000000000007, 457, 537, 500.0, 536.9, 537.0, 537.0, 0.06565988181221274, 2.1147739863755746, 0.03456120732107682], "isController": false}, {"data": ["https://gs-stage.klaarhq.com/get_groups_from_groups_ids/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", 10, 10, 100.0, 65.5, 52, 128, 60.5, 121.50000000000003, 128.0, 128.0, 0.0659452258953713, 0.01597110939653524, 0.04160216399258776], "isController": false}, {"data": ["https://okr-stage.klaarhq.com/performance/my_objectives/?time_period_id=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=5&sort_by_key=created_at&sort_by_value=DESC", 10, 0, 0.0, 316.4, 282, 361, 314.0, 358.1, 361.0, 361.0, 0.06560259261446012, 1.0151104296641804, 0.04145007560698799], "isController": false}, {"data": ["https://okr-stage.klaarhq.com/performance/jira_config/", 10, 10, 100.0, 124.1, 94, 227, 100.0, 226.5, 227.0, 227.0, 0.06675433736307017, 0.03024805911764117, 0.034680964333157545], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/compensation_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea&limit=10&offset=0", 10, 0, 0.0, 120.0, 108, 138, 116.0, 137.5, 138.0, 138.0, 0.0659356599829886, 0.09156299657793925, 0.03837661459947383], "isController": false}, {"data": ["https://okr-stage.klaarhq.com/performance/dashboard/?weightage_enabled=true", 10, 0, 0.0, 3488.7999999999997, 3084, 3870, 3558.0, 3859.7, 3870.0, 3870.0, 0.06417249566835655, 0.27827299781813514, 0.03465565439902458], "isController": false}, {"data": ["https://um-stage.klaarhq.com/integrations/info/nylas", 10, 0, 0.0, 137.1, 107, 252, 128.0, 240.20000000000005, 252.0, 252.0, 0.06548316755178081, 0.028329143774842674, 0.03389265508051155], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/org_users/user/?org_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&dr_count=false", 10, 0, 0.0, 130.70000000000002, 121, 147, 127.5, 146.5, 147.0, 147.0, 0.06547116322615704, 0.13599332439651954, 0.03804232628863617], "isController": false}, {"data": ["https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=9", 10, 0, 0.0, 45.9, 35, 119, 37.0, 111.40000000000003, 119.0, 119.0, 0.06550761853603573, 0.23349883560208054, 0.043181291515453246], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/my-org/", 30, 0, 0.0, 134.13333333333333, 119, 210, 134.0, 142.60000000000002, 177.54999999999995, 210.0, 0.19307379924186355, 0.6190051590928106, 0.09861093457372523], "isController": false}, {"data": ["https://review-stage.klaarhq.com/get_ratings_for_org", 30, 0, 0.0, 84.66666666666666, 63, 216, 71.0, 169.1000000000002, 201.7, 216.0, 0.19222759747541088, 0.07834275782526512, 0.12014224842213181], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/org-config/", 10, 0, 0.0, 121.7, 114, 129, 122.0, 129.0, 129.0, 129.0, 0.06680963929475744, 0.04410480094067972, 0.03438347647298552], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/org/document/settings/", 10, 0, 0.0, 109.60000000000001, 100, 122, 109.5, 121.7, 122.0, 122.0, 0.06582411795681938, 0.03059792983149026, 0.03458337447340706], "isController": false}, {"data": ["https://survey-stage.klaarhq.com/feedback-nomination/feedback-nomination/?created_by=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&offset=0&limit=10", 10, 0, 0.0, 506.20000000000005, 443, 641, 468.0, 635.2, 641.0, 641.0, 0.06532403989992358, 0.24241342931612264, 0.03936028576001254], "isController": false}, {"data": ["https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=10", 20, 0, 0.0, 459.40000000000003, 393, 526, 463.0, 520.1, 525.75, 526.0, 0.13007791667208657, 1.0228392432066808, 0.07012012695604668], "isController": false}, {"data": ["https://pas-stage.klaarhq.com/get_settings_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", 130, 0, 0.0, 51.91538461538462, 43, 207, 48.0, 54.0, 57.44999999999999, 202.65999999999997, 0.8258897373670635, 15.904023174942505, 0.45569111485585045], "isController": false}, {"data": ["https://survey-stage.klaarhq.com/org/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", 10, 0, 0.0, 200.4, 155, 265, 181.5, 264.3, 265.0, 265.0, 0.06548445399062262, 7.133520857617151, 0.03555601212772088], "isController": false}, {"data": ["https://okr-stage.klaarhq.com/performance/bulk_import/?page=1&page_size=10", 10, 0, 0.0, 106.0, 88, 130, 104.0, 129.1, 130.0, 130.0, 0.0656697991160845, 0.028345753134091167, 0.035400126086014304], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D", 10, 0, 0.0, 134.10000000000002, 123, 169, 132.5, 166.20000000000002, 169.0, 169.0, 0.06669289920702143, 1.315035476454072, 0.03582138141002127], "isController": false}, {"data": ["https://review-stage.klaarhq.com/get_competencies?type=undefined", 10, 0, 0.0, 63.5, 57, 98, 59.0, 94.70000000000002, 98.0, 98.0, 0.06565513981262022, 0.017311413817780723, 0.04116269507783417], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea/skills/", 30, 0, 0.0, 111.36666666666667, 97, 127, 111.5, 119.9, 125.35, 127.0, 0.18811372101481083, 0.33948648089391636, 0.10360951040268877], "isController": false}, {"data": ["https://mentoring-stage.klaarhq.com/mentoring/programs/?search=&offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", 10, 0, 0.0, 42.5, 39, 45, 42.5, 45.0, 45.0, 45.0, 0.06545359340227778, 0.7722756987171095, 0.043273518294279355], "isController": false}, {"data": ["https://pas-stage.klaarhq.com/get_pas_keys", 10, 0, 0.0, 79.0, 59, 134, 63.0, 131.8, 134.0, 134.0, 0.0667498815189603, 0.018708218746036728, 0.039372000427199245], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/values/opertaions/", 30, 0, 0.0, 165.10000000000002, 98, 1731, 105.5, 172.30000000000013, 884.5499999999989, 1731.0, 0.1812634059393976, 0.40819669345337, 0.09452603395667805], "isController": false}, {"data": ["https://mentoring-stage.klaarhq.com/mentoring/mentor/4d4720e5-9027-4a32-b683-a3ef965009fe/?with=pending_requests%2Cprograms_connected%2Cconnection_availability", 10, 0, 0.0, 573.0999999999999, 525, 617, 574.0, 616.2, 617.0, 617.0, 0.06525370641052412, 0.11400281325041763, 0.04059239353857799], "isController": false}, {"data": ["https://review-stage.klaarhq.com/get_competencies_for_user?type_id=undefined&for_rate_tab=false&ou_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", 10, 0, 0.0, 60.7, 54, 100, 56.0, 96.00000000000001, 100.0, 100.0, 0.06567023037116815, 0.01731539277364785, 0.044506972536709655], "isController": false}, {"data": ["https://survey-stage.klaarhq.com/pending_surveys/?user=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", 10, 0, 0.0, 112.6, 105, 120, 111.5, 119.7, 120.0, 120.0, 0.06552178271666416, 0.025018571330288755, 0.03640809996658389], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/eou/", 10, 0, 0.0, 155.50000000000003, 135, 235, 148.0, 226.90000000000003, 235.0, 235.0, 0.06685877421123361, 0.13698213700700013, 0.03395172127914207], "isController": false}, {"data": ["https://surveyms-stage.klaarhq.com/get_all_system_reports", 10, 0, 0.0, 99.6, 66, 150, 102.5, 148.70000000000002, 150.0, 150.0, 0.06552264134871805, 0.027898312136758856, 0.04715838542383321], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/employee/?page=1&page_size=10&search=&get_disabled=true&filter=%5B%5D", 10, 0, 0.0, 146.2, 129, 162, 146.5, 161.1, 162.0, 162.0, 0.0659156674950069, 1.5718698091411847, 0.037656899887284205], "isController": false}, {"data": ["https://gs-stage.klaarhq.com/get_groups_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", 20, 0, 0.0, 131.65, 81, 359, 98.5, 258.90000000000003, 354.0999999999999, 359.0, 0.12842410777351126, 2.245916916023476, 0.08540704823609488], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22roles%22%2C%22__iregex%22%2C%22(%3F%3C!_)ADMIN%22%2C%22%22%5D%5D&page_size=10", 20, 0, 0.0, 126.49999999999999, 112, 192, 120.5, 141.70000000000002, 189.49999999999997, 192.0, 0.12765685836471566, 0.20582175113295464, 0.08028419608093446], "isController": false}, {"data": ["https://review-stage.klaarhq.com/get_reviews_for_org", 20, 0, 0.0, 87.95, 69, 172, 80.5, 150.30000000000007, 171.1, 172.0, 0.13113808184327688, 0.5638681390194806, 0.0806806558215473], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/org-chart/", 10, 0, 0.0, 117.60000000000001, 89, 236, 106.5, 224.20000000000005, 236.0, 236.0, 0.06564738165418273, 0.03628556446901115, 0.03372121362314464], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/razorpay/", 10, 10, 100.0, 126.4, 110, 184, 119.0, 178.70000000000002, 184.0, 184.0, 0.06674854488172158, 0.031418748665029105, 0.03422166607705452], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/user_customfield/", 20, 0, 0.0, 114.6, 107, 129, 113.0, 123.0, 128.7, 129.0, 0.1303899964794701, 0.13955804310693284, 0.06786901183941169], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/successfactor/", 10, 0, 0.0, 123.0, 110, 155, 117.5, 153.8, 155.0, 155.0, 0.06681276391041745, 0.028317128454219895, 0.03458082507082153], "isController": false}, {"data": ["https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=9007199254740991", 10, 0, 0.0, 459.5, 408, 518, 465.0, 514.1, 518.0, 518.0, 0.06553337614847242, 0.5153073679174804, 0.03622254970706581], "isController": false}, {"data": ["https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=9&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=5", 10, 0, 0.0, 37.300000000000004, 35, 39, 37.0, 39.0, 39.0, 39.0, 0.06546430558737848, 0.030558533272233315, 0.04315274049949265], "isController": false}, {"data": ["https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=goal", 10, 0, 0.0, 144.8, 92, 294, 102.5, 288.5, 294.0, 294.0, 0.06585619640952017, 0.029197962080002107, 0.03543629318520079], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&page_size=10", 10, 0, 0.0, 124.5, 111, 133, 124.5, 132.9, 133.0, 133.0, 0.06563617866167831, 0.18101227396540975, 0.03570249171343245], "isController": false}, {"data": ["https://review-stage.klaarhq.com/get_reviews_for_user", 20, 0, 0.0, 78.85, 67, 112, 75.0, 98.60000000000001, 111.35, 112.0, 0.1311492609739144, 0.05033365191674645, 0.0832490426103949], "isController": false}, {"data": ["https://okr-stage.klaarhq.com/performance/time_period/?time_period_ids=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=10", 10, 0, 0.0, 134.09999999999997, 88, 402, 101.0, 376.80000000000007, 402.0, 402.0, 0.06546773422718613, 0.08477560115746953, 0.03867966719477305], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/shortcuts/?mode=all", 10, 0, 0.0, 128.39999999999998, 108, 195, 118.5, 191.8, 195.0, 195.0, 0.06566678048908618, 0.03058892020829503, 0.034308327696934676], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/me/", 10, 0, 0.0, 178.3, 149, 220, 175.5, 218.5, 220.0, 220.0, 0.06682258603407952, 0.1896351904443702, 0.0338680880387571], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["400/Bad Request", 10, 33.333333333333336, 0.9259259259259259], "isController": false}, {"data": ["500/Internal Server Error", 10, 33.333333333333336, 0.9259259259259259], "isController": false}, {"data": ["404/Not Found", 10, 33.333333333333336, 0.9259259259259259], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 1080, 30, "400/Bad Request", 10, "500/Internal Server Error", 10, "404/Not Found", 10, "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://gs-stage.klaarhq.com/get_groups_from_groups_ids/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", 10, 10, "500/Internal Server Error", 10, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["https://okr-stage.klaarhq.com/performance/jira_config/", 10, 10, "404/Not Found", 10, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/razorpay/", 10, 10, "400/Bad Request", 10, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
