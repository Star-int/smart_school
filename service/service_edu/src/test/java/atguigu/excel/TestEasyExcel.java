package atguigu.excel;

import com.alibaba.excel.EasyExcel;

import java.util.ArrayList;
import java.util.List;

/**
 * @author krilo
 * @date 2024-02-29 20:16
 */
public class TestEasyExcel {
    public static void main(String[] args) {
        //诗仙excel写的操作
        //1、设置写入文件地址和excel文件名称
        String filename="D:\\easyexcel\\write.xlsx";

        //调用easyexcl实现写入操作
        //俩个参数，第一个乌文件路径名，第二个为参数实体类class
//        EasyExcel.write(filename,DemoData.class).sheet("学生列表").doWrite(getData());
//
//    }

//     private  static List<DemoData> getData(){
//        List<DemoData> list =new ArrayList<>();
//        for(int i =0;i<10;i++)
//        {
//            DemoData demoData = new DemoData();
//            demoData.setSno(i);
//            demoData.setSname("lucy"+i);
//            list.add(demoData);
//        }

        EasyExcel.read(filename,DemoData.class,new ExcelListen()).sheet().doRead();

     }
}
