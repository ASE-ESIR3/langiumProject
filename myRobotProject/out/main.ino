#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
int square(int a){
return a*a;
}
void main(){
int a = 3;
int stop = square(a)*square(a);
int step = 10;
printf("%d",stop);
rotate(stop);
forward(stop*0.1);
bool test = true;
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
for (int val = 0; val<4; val = val+1){
{
printf("%d",val);
rotate(90);
forward(10*0.1);
}

}
;
return ;
}
