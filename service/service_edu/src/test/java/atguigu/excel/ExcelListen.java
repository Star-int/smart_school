package atguigu.excel;

import com.alibaba.excel.context.AnalysisContext;
import com.alibaba.excel.event.AnalysisEventListener;

import java.util.Map;

/**
 * @author krilo
 * @date 2024-02-29 20:31
 */
public class ExcelListen extends AnalysisEventListener<DemoData> {

    //一行行读取excel内容
    @Override
    public void invoke(DemoData demoData, AnalysisContext analysisContext) {
        System.out.println("*****"+demoData);
    }

    ///读取表头内容
    @Override
    public void invokeHeadMap(Map<Integer, String> headMap, AnalysisContext context) {
        System.out.println("表头"+headMap);
    }

    //    读取完之后
    @Override
    public void doAfterAllAnalysed(AnalysisContext analysisContext) {

    }
}
