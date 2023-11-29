#include <stdio.h>
#include <stdlib.h>
int square(int a = 0){
return a*a;
}
int main(int argc,int argv){
int a = 3;
int stop = square(a)*square(a);
int step = 10;
printf("%d",stop);
int test = true;
if (test)
{
printf("%d",1==1);
}


else{
printf("%d",a+1);
}
;
printf("%d",a);
printf("%d",stop);
while (a<stop){
{
printf("%d",a);
a = a+step;
}

}
;
}
