c:\nuget\nuget.exe pack .\ExpectThat.Pavlov.nuspec
md c:\nuget\ExpectThat.Pavlov\
copy .\*.nupkg c:\nuget\ExpectThat.Pavlov\ /Y
pause